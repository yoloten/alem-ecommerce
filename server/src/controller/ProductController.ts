import { Controller, Post, Get, Delete, Middleware, Put } from "@overnightjs/core"
import { findDuplicates } from "../utils/findDuplicates"
import { getConnection, TableColumn, TableForeignKey } from "typeorm"
// import { jwtVerify } from "../utils/jwtVerify"
import { filterMany } from "../utils/filterMany"
import { Request, Response } from "express"
import * as multer from "multer"
import * as sharp from "sharp"
import * as path from "path"
import { v4 } from "uuid"
import * as fs from "fs"

import { Options } from "../entity/Options"
import { Schema } from "../entity/Schema"
import { Macro } from "../entity/Macro"

function getImgFromDir(fileName: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

const selectType = (type: string) => {
    if (type === "enum") {
        return "ENUM"
    }
    if (type === "number") {
        return "NUMERIC"
    }
    if (type === "string") {
        return "VARCHAR"
    }
}

const storage = multer.memoryStorage()

const multerFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb("Please upload only images.", false)
    }
}

const upload = multer({ storage, fileFilter: multerFilter })

@Controller("api/product")
export class ProductController {

    @Get("list/")
    public async list(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { search, sortBy, category } = req.query

            const products = await connection.query(`
                SELECT 
                    product.name, 
                    product.count,
                    product.id,
                    product.sold,
                    pricing.price,
                    pricing.discount,
                    pricing.currency,
                    category.name as category_name
                FROM product 
                LEFT JOIN pricing ON product.price_id = pricing.id
                LEFT JOIN category ON product.category_id = category.id
                WHERE 
                    product.name ILIKE '%${search}%'
                    ${category && "AND category.uuid = " + `'${category}'`}
                ${sortBy && "ORDER BY " + sortBy};
            `)

            res.json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("onebyid/")
    public async getOneById(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { id, edit } = req.query
            const selects: any = []
            const joins: any = []

            const schema: any = await connection.getRepository(Schema).findOne({ table: "product" })

            if (schema.attributes) {
                const attributes = JSON.parse(schema.attributes)

                for (let i = 0; i < attributes.length; i++) {
                    const attribute = schema.attributes[i]

                    const hasColumn = await queryRunner.hasColumn("product",
                        attribute.type === "Number" || attribute.type === "String"
                            ? attribute.name
                            : attribute.name + "_product_id",
                    )

                    if (hasColumn) {
                        if (attribute.type !== "Number" && attribute.type !== "String") {
                            selects.push(`${attribute.name}_product.${attribute.name}_name`)
                            joins.push(`LEFT JOIN ${attribute.name}_product ON ${attribute.name}_product.id = product.${attribute.name}_product_id`)
                        }
                    }
                    if (attribute.type === "Number" || attribute.type === "String") {
                        selects.push(`product.${attribute.name}`)
                    }
                }
            }

            const product: any = await connection.query(`
                SELECT 
                    product.name as name,
                    product.description as description,
                    product.count as count,
                    product.id as id,
                    category.uuid as category_uuid,
                    category.name as category_name,
                    pricing.price,
                    pricing.discount,
                    pricing.currency,
                    ${selects.join(", ")}
                FROM product
                LEFT JOIN category ON category.id = product.category_id
                LEFT JOIN pricing ON pricing.id = product.price_id
                ${joins.join(" ")}
                WHERE product.id = ${id}
            `)

            const photos = await connection.query(`
                    SELECT *
                    FROM photo
                    WHERE photo.product_id = ${id}
                `)

            if (edit) {
                const filesArr: any = []

                for (let i = 0; i < photos.length; i++) {
                    if (photos[i].filename) {
                        const imgFile: any = await getImgFromDir(path.join("public", photos[i].filename))
                        const obj = {
                            image: imgFile.toString("base64"),
                            name: photos[i].filename,
                        }

                        filesArr.push(obj)
                    }
                }

                product[0].photos = filesArr
            } else {
                product[0].photos = photos
            }

            res.json(product[0])
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("schema/")
    public async getSchema(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        const table: any = req.query.table

        try {

            const schema = await connection.getRepository(Schema).findOne({ table })

            if (schema) {
                res.json(schema)
            } else {
                res.json({ msg: "no schema" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("macro/")
    public async getMacro(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const name: any = req.query.name

        try {
            const macro = await connection.getRepository(Macro).findOne({ name }, { relations: ["options"] })

            res.json(macro)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("allfilters/")
    public async getAllFilters(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const schema: any = await connection.getRepository(Schema).findOne({ table: "product" })
            const allowedToFilter = []

            for (let i = 0; i < schema.attributes.length; i++) {
                if (schema.attributes[i].allowFilter) {
                    if (schema.attributes[i].type === "Number" || schema.attributes[i].type === "String") {
                        allowedToFilter.push(schema.attributes[i])
                    } else {
                        const fromQuery = await connection
                            .getRepository(Macro)
                            .find({
                                relations: ["options"],
                                where: { name: schema.attributes[i].type },
                            })

                        allowedToFilter.push(fromQuery[0])
                    }
                }
            }

            res.json(allowedToFilter)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("allmacros/")
    public async getMacros(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const name: any = req.query.name

        try {
            const macros = await connection.getRepository(Macro).find({ relations: ["options"] })
            const editedMacros = macros.map((macro: any) => {
                macro.validatorsList = macro.validatorsList.split(", ")
                return macro
            })

            res.json(editedMacros)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("createmacro/")
    public async createMacro(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            for (let i = 0; i < req.body.length; i++) {
                if (!req.body[i].name && !req.body[i].label && !req.body[i].type) {
                    res.json({ msg: "Fill all fields" })
                } else {
                    const existedMacro = await connection.getRepository(Macro).findOne({ uuid: req.body[i].uuid })

                    if (!existedMacro) {
                        const macroProps = {
                            label: req.body[i].label,
                            name: req.body[i].name.toLowerCase().split(" ").join("_"),
                            type: req.body[i].type,
                            uuid: req.body[i].uuid,
                            validatorsList: req.body[i].validatorsList.join(", "),
                            validators: req.body[i].validators,
                        }

                        const macro = new Macro()
                        Object.assign(macro, macroProps)

                        await connection.manager.save(macro)

                        if (req.body[i].options && req.body[i].options.length > 0) {
                            req.body[i].options.map(async (option: any) => {

                                const optionsProps = {
                                    label: option.label,
                                    value: option.value,
                                    name: option.name.toLowerCase().split(" ").join("_"),
                                    meta: option.meta,
                                    uuid: option.uuid,
                                    macro,
                                }

                                const newOption = new Options()
                                Object.assign(newOption, optionsProps)

                                await connection.manager.save(newOption)
                            })
                        }
                    } else {
                        const getSchema: any = await connection.getRepository(Schema).findOne({ table: "product" })

                        for (let i = 0; i < getSchema.attributes.length; i++) {
                            if (getSchema.attributes[i].type === existedMacro.name) {
                                getSchema.attributes[i].type = req.body[i].name

                                await connection.query(`
                                    ALTER TABLE IF EXISTS ${existedMacro.name + "_name"}
                                    RENAME TO ${req.body[i].name + "_name"};
                                `)
                            }
                        }

                        const updated = await getConnection()
                            .createQueryBuilder()
                            .update(Schema)
                            .set({ attributes: getSchema.attributes })
                            .where("table = :table", { table: "product" })
                            .execute()

                        await getConnection()
                            .createQueryBuilder()
                            .update(Macro)
                            .set({
                                label: req.body[i].label,
                                name: req.body[i].name.toLowerCase().split(" ").join("_"),
                                type: req.body[i].type,
                                validators: req.body[i].validators,
                            })
                            .where("uuid = :uuid", { uuid: req.body[i].uuid })
                            .execute()

                        if (req.body[i].options && req.body[i].options.length > 0) {
                            req.body[i].options.map(async (option: any) => {
                                const existedOption = await connection
                                    .getRepository(Options)
                                    .findOne({ uuid: option.uuid })

                                if (!existedOption) {
                                    const optionsProps = {
                                        label: option.label,
                                        value: option.value,
                                        name: option.name.split(" ").join("_"),
                                        meta: option.meta,
                                        uuid: option.uuid,
                                        macro: existedMacro,
                                    }

                                    const newOption = new Options()
                                    Object.assign(newOption, optionsProps)

                                    await connection.manager.save(newOption)
                                } else {
                                    await getConnection()
                                        .createQueryBuilder()
                                        .update(Options)
                                        .set({
                                            label: option.label,
                                            value: option.value,
                                            name: option.name.toLowerCase().split(" ").join("_"),
                                            meta: option.meta,
                                        })
                                        .where("uuid = :uuid", { uuid: option.uuid })
                                        .execute()
                                }
                            })
                        }
                    }
                }
            }

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("createschema/")
    public async createAttribute(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { table, attributes } = req.body
            const existedSchema = await connection.getRepository(Schema).findOne({ table })

            if (!existedSchema) {
                const schemaProps = {
                    table,
                    attributes: JSON.stringify(attributes),
                }

                const schema = new Schema()
                Object.assign(schema, schemaProps)

                await connection.manager.save(schema)
            } else {
                await getConnection()
                    .createQueryBuilder()
                    .update(Schema)
                    .set({ attributes })
                    .where("table = :table", { table })
                    .execute()
            }

            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("filters/")
    public async filters(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { fields, limit, category, price, sort } = req.body
            const joins: any[] = []
            const wheres: any[] = []
            const filteredCategory = category.filter((i: any) => i !== "")

            if (filteredCategory.length > 0) {
                wheres.push(`product.category_id IN (${filteredCategory.map((item: any) => item).join(", ")})`)
            }

            joins.push(`LEFT JOIN pricing ON product.price_id = pricing.id`)
            wheres.push(`(price BETWEEN ${price[0]} AND ${price[1]})`)

            if (fields && fields.length > 0) {
                for (let i = 0; i < fields.length; i++) {
                    const keyAndVal: any = Object.entries(fields[i]).flat()
                    const key = Object.keys(fields[i])[0]

                    if (key) {
                        const hasColumn = await queryRunner.hasColumn("product", `${key}_product_id`)

                        if (hasColumn) {
                            if (keyAndVal[1]) {
                                joins.push(`LEFT JOIN ${key}_product ON ${key}_product.id = product.${key}_product_id`)
                                wheres.push(`${keyAndVal[0]}_name = '${keyAndVal[1]}'`)
                            }
                        }
                    }
                }
            }

            try {
                const products = await connection.query(`
                    SELECT * FROM product
                    ${joins.join(" ")}
                    ${wheres.length > 0 ? "WHERE" : ""} ${wheres.join(" AND ")}
                    ORDER BY ${sort}
                    LIMIT ${limit};
                `)

                // console.log(products.length)
                res.json(products)
            } catch (error) {
                console.log(error)
            }

            // for (let i = 0; i < products.length; i++) {
            //     const photos = await connection.query(`
            //         SELECT *
            //         FROM photo
            //         WHERE photo.product_id = ${products[i].id}
            //         limit 1;
            //     `)

            //     products[i].photos = photos
            // }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { table } = req.body
            const schema: any = await connection.getRepository(Schema).findOne({ table })

            // CREATE TABLES, ADD COLUMNS
            // TODO: VALIDATIONS(but I'll do it in the main project) 
            await queryRunner.manager
                .query(`
                    CREATE TABLE IF NOT EXISTS product (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR NOT NULL,
                        count INT NOT NULL,
                        description VARCHAR NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        sold INT DEFAULT 0
                    );
                `)

            // PRICE
            const hasPriceColumn = await queryRunner.hasColumn(table, "price_id")

            if (!hasPriceColumn) {
                await queryRunner.manager
                    .query(`
                    CREATE TABLE IF NOT EXISTS pricing (
                        id SERIAL PRIMARY KEY,
                        price NUMERIC NOT NULL,
                        discount NUMERIC NOT NULL,
                        currency VARCHAR NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                `)

                await queryRunner.addColumn(table, new TableColumn({
                    name: "price_id",
                    type: "int",
                }))

                await queryRunner.createForeignKey(table, new TableForeignKey({
                    columnNames: ["price_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "pricing",
                }))

            }

            // PHOTO
            const hasPhotoColumn = await queryRunner.hasColumn(table, "photo_id")

            if (!hasPhotoColumn) {
                await queryRunner.manager
                    .query(`
                    CREATE TABLE IF NOT EXISTS photo (
                        id SERIAL PRIMARY KEY,
                        filename VARCHAR NOT NULL,
                        extension VARCHAR NOT NULL,
                        path VARCHAR NOT NULL,
                        product_id INT NOT NULL,
                        FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
                    );
                `)
            }

            // CATEGORY
            const hasCategoryColumn = await queryRunner.hasColumn(table, "category_id")

            if (!hasCategoryColumn) {
                await queryRunner.addColumn(table, new TableColumn({
                    name: "category_id",
                    type: "int",
                }))

                await queryRunner.createForeignKey(table, new TableForeignKey({
                    columnNames: ["category_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "category",
                }))
            }

            // CUSTOM FIELDS
            if (schema.attributes) {
                const attributes = JSON.parse(schema.attributes)

                for (let i = 0; i < attributes.length; i++) {
                    const macro = await connection.getRepository(Macro).findOne({ name: attributes[i].type })
                    const options = await connection.getRepository(Options).find({ macro })
                    const optionValues: any[] = options ? options.map((option: any) => `'${option.value}'`) : []

                    if (macro) {
                        const type: any = selectType(macro.type)
                        const macroTableName = macro.name.toLowerCase() + "_" + table

                        if (type === "ENUM") {
                            await queryRunner.manager
                                .query(`
                                    DO $$ BEGIN
                                        CREATE TYPE ${macro.name.toLowerCase() + "_enum"} AS ENUM ${"(" + optionValues.join(', ') + ")"};
                                    EXCEPTION
                                        WHEN duplicate_object THEN null;
                                    END $$;
                                `)

                            await queryRunner.manager
                                .query(`
                                        CREATE TABLE IF NOT EXISTS ${macroTableName} (
                                            id SERIAL PRIMARY KEY,
                                            ${macro.name.toLowerCase() + "_name"} ${type === "ENUM" ? macro.name.toLowerCase() + "_enum" : type} NOT NULL,
                                            type VARCHAR NOT NULL,
                                            ${type === "ENUM" ? `product_id INT NOT NULL, FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE` : ""}
                                        );
                                    `)
                        }

                        await queryRunner.manager
                            .query(`
                                CREATE TABLE IF NOT EXISTS ${macroTableName} (
                                    id SERIAL PRIMARY KEY,
                                    ${macro.name.toLowerCase() + "_name"} ${type === "ENUM" ? macro.name.toLowerCase() + "_enum" : type} NOT NULL,
                                    type VARCHAR NOT NULL
                                );
                            `)

                        const hasColumn = await queryRunner.hasColumn(table, macro.name + "_" + table + "_id")

                        if (!hasColumn && type !== "ENUM") {
                            await queryRunner.addColumn(table, new TableColumn({
                                name: macro.name + "_product_id",
                                type: "int",
                            }))

                            await queryRunner.createForeignKey(table, new TableForeignKey({
                                columnNames: [macro.name + "_" + table + "_id"],
                                referencedColumnNames: ["id"],
                                referencedTableName: macro.name + "_" + table,
                            }))
                        }
                    } else {
                        // Just add column to main table if it's not a macro
                        const columnType: any = selectType(attributes[i].type.toLowerCase())

                        await queryRunner.manager
                            .query(`
                                ALTER TABLE ${table}
                                    ADD COLUMN IF NOT EXISTS ${attributes[i].name} ${columnType};
                                `)
                    }

                }
            }

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("insert/")
    @Middleware(upload.array("photos[]", 8))
    public async insert(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { table, fields, mainProperties } = req.body
            const primaryProperties = JSON.parse(mainProperties)
            const parsedFields = JSON.parse(fields)
            const photos: any = req.files
            const names: any = []
            const values: any = []
            const enums: any = []
           
            // CATEGORY
            const getCategory = await connection.query(`
                SELECT id FROM category WHERE category.uuid = $1
                `, [primaryProperties.category])

            names.push("category_id")
            values.push(getCategory[0].id)

            // PRICE
            const priceID = await connection.query(`
                    INSERT INTO pricing(price, discount, currency)
                    VALUES 
                        ($1, $2, $3)
                    Returning id;
                `, [primaryProperties.price, primaryProperties.discount, primaryProperties.currency])

            names.push("price_id")
            values.push(priceID[0].id)

            // SECONDARY PROPERTIES
            for (let i = 0; i < parsedFields.length; i++) {
                const existedMacroTable = await connection.getRepository(Macro).findOne({ name: parsedFields[i].type })
                const key = parsedFields[i][Object.keys(parsedFields[i])[0]]
                
                if (!existedMacroTable) {
                    // Push data if it is not a macro 
                    names.push(Object.keys(parsedFields[i])[0])

                    if (parsedFields[i].type === "string" || parsedFields[i].type === "String") {
                        values.push(`'${key}'`)
                    } else {
                        values.push(key)
                    }
                } else {
                    if (!Array.isArray(key)) {
                        // First insert data to macro table and return id(needs for relation)
                        const id = await queryRunner.manager
                            .query(`
                                INSERT INTO ${parsedFields[i].type + "_product"} (${parsedFields[i].type + "_name"}, type)
                                VALUES
                                    ($1, $2)
                                Returning id;
                            `, [key, parsedFields[i].type])

                        // Then push that id into arrays with values and names to insert into main table
                        names.push(parsedFields[i].type + "_product_id")
                        values.push(id[0].id)
                    } else {
                        enums.push({key, type: parsedFields[i].type})
                    }
                }
            }

            names.push("name", "description", "count")
            values.push(`'${primaryProperties.name}'`, `'${primaryProperties.description}'`, primaryProperties.count)

            // Insert into main table
            const productID = await queryRunner.manager
                .query(`
                    INSERT INTO product(${names.join(",")})
                    VALUES
                        (${values.join(', ')})
                    Returning id;
                `)
            // PHOTOS
            for (let i = 0; i < req.files.length; i++) {
                const generated = "product_image_" + v4() + ".jpeg"

                await sharp(photos[i].buffer)
                    .resize(1500)
                    .toFormat("jpeg")
                    .jpeg({ quality: 75 })
                    .toFile(`public/${generated}`)

                await connection.query(`
                    INSERT INTO photo(filename, extension, path, product_id)
                    VALUES 
                        ($1, $2, $3, $4);
                `, [generated, "jpeg", `public/${generated}`, productID[0].id])
            }
            
            for (let i = 0; i < enums.length; i++) {
                for (let j = 0; j < enums[i].key.length; j++) {
                    await queryRunner.manager
                    .query(`
                        INSERT INTO ${parsedFields[i].type + "_product"} (${parsedFields[i].type + "_name"}, type, product_id)
                        VALUES
                            ($1, $2, $3)
                    `, [enums[i].key[j], parsedFields[i].type, productID[0].id])
                }
            }

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Put("update/")
    @Middleware(upload.array("photos[]", 8))
    public async update(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { table, fields, mainProperties } = req.body
            const primaryProperties = JSON.parse(mainProperties)
            const parsedFields = JSON.parse(fields)
            const photos: any = req.files
            const fieldsSetStrings: any = []

            if (parsedFields.length > 0) {
                for (let i = 0; i < parsedFields.length; i++) {
                    const key = parsedFields[i][Object.keys(parsedFields[i])[0]]
                    const existedMacroTable = await connection
                        .getRepository(Macro).findOne({ name: parsedFields[i].type })

                    if (existedMacroTable) {
                        const id = await connection.query(`
                            INSERT INTO ${parsedFields[i].type + "_product"} (${parsedFields[i].type + "_name"}, type)
                            VALUES
                                ($1, $2)
                            Returning id;
                        `, [Array.isArray(key) ? key[0] : key, parsedFields[i].type])

                        fieldsSetStrings.push(`${parsedFields[i].type + "_product_id = " + id[0].id}`)
                    } else {
                        if (parsedFields[i].type === "string" || parsedFields[i].type === "String") {
                            fieldsSetStrings.push(`${Object.keys(parsedFields[i])[0]} = '${key}'`)
                        } else {
                            fieldsSetStrings.push(`${Object.keys(parsedFields[i])[0]} = ${key}`)
                        }

                    }
                }
            }

            const category = await connection.query(`
                SELECT id 
                FROM category 
                WHERE category.uuid = $1
            `, [primaryProperties.category])

            const newPrice = await connection.query(`
                INSERT INTO pricing (price, discount, currency)
                VALUES
                    ($1, $2, $3)
                RETURNING id;
            `, [primaryProperties.price, primaryProperties.discount, primaryProperties.currency])

            await connection
                .query(`
                UPDATE product
                SET 
                    name = $1,
                    description = $2,
                    count = $3,
                    price_id = $4,
                    category_id = $5,
                    ${fieldsSetStrings.join(", ")}
                WHERE id = $6
            `, [
                    primaryProperties.name,
                    primaryProperties.description,
                    primaryProperties.count,
                    newPrice[0].id,
                    category[0].id,
                    primaryProperties.id,
                ])


            for (let i = 0; i < photos.length; i++) {
                const photo = await connection.query(`
                    SELECT filename
                    FROM photo
                    WHERE filename = '${photos[i].originalname}'
                `)

                if (photo.length === 0) {
                    const generated = "product_image_" + v4() + ".jpeg"

                    await sharp(photos[i].buffer)
                        .resize(1500)
                        .toFormat("jpeg")
                        .jpeg({ quality: 75 })
                        .toFile(`public/${generated}`)

                    await connection.query(`
                            INSERT INTO photo(filename, extension, path, product_id)
                            VALUES 
                                ($1, $2, $3, $4);
                        `, [generated, "jpeg", `public/${generated}`, primaryProperties.id])
                }
            }

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Delete("deleteone/")
    public async deleteOne(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { id } = req.body

            const deletedPhotos = await connection.query(`
                SELECT filename FROM photo
                WHERE photo.product_id = ${id}
            `)

            const deleteProduct = await connection.query(`
                DELETE FROM product
                WHERE id = ${id}
                RETURNING *
            `)

            Object.keys(deleteProduct[0][0]).map(async (relation: any) => {
                if (relation.slice(-3) === "_id" && relation.slice(0, -3) !== "category") {
                    let price_id

                    if (relation.slice(0, -3) === "price") {
                        price_id = "pricing"
                    }

                    await connection.query(`
                        DELETE FROM ${relation.slice(0, -3) === "price" ? price_id : relation.slice(0, -3)}
                        WHERE id = ${deleteProduct[0][0][relation]}
                    `)
                }
            })

            fs.readdir("public", (err, files) => {
                if (err) { throw err }

                for (const file of files) {
                    deletedPhotos.map((item: any) => {
                        if (item.filename === file) {
                            fs.unlink(path.join("public", file), (error: any) => {
                                if (error) { throw error }
                            })
                        }
                    })
                }
            })

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    @Delete("deletephoto/")
    public async deletePhoto(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { filename } = req.body

            await connection.query(`
                DELETE FROM photo
                WHERE filename = '${filename}'
            `)

            fs.readdir("public", (err, files) => {
                if (err) { throw err }

                for (const file of files) {
                    if (filename === file) {
                        fs.unlink(path.join("public", file), (error: any) => {
                            if (error) { throw error }
                        })
                    }
                }
            })

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
