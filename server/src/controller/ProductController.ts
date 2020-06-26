import { Controller, Post, Get, Delete, Middleware, Put } from "@overnightjs/core"
import { getConnection, TableColumn, TableForeignKey } from "typeorm"
// import { jwtVerify } from "../utils/jwtVerify"
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

        try {
            const { search, sortBy, category, offset } = req.query

            const products = await connection.query(`
                SELECT 
                    product.name, 
                    product.count,
                    product.id,
                    product.sold,
                    product.created_at,
                    product.updated_at,
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
                ${sortBy && "ORDER BY " + sortBy}
                LIMIT 12 OFFSET ${offset};
            `)

            res.json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("onebyid/")
    public async getOneById(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { id, edit } = req.query
            const selects: any = []
            const joins: any = []
            const additionalEnums: any = {}

            const schema: any = await connection.getRepository(Schema).findOne({ table: "product" })

            if (schema.attributes) {
                const attributes = JSON.parse(schema.attributes)

                for (let i = 0; i < attributes.length; i++) {
                    const attribute = attributes[i]

                    const hasColumn = await connection.query(`
                        SELECT column_name
                        FROM information_schema.columns
                        WHERE table_name='product' and column_name='${
                            attribute.type === "Number" || attribute.type === "String"
                                ? attribute.name
                                : attribute.name + "_product_id"
                        }';
                    `)

                    if (hasColumn.length > 0) {
                        if (attribute.type !== "Number" && attribute.type !== "String") {
                            selects.push(`${attribute.name}_product.${attribute.name}_name`)
                            joins.push(
                                `LEFT JOIN ${attribute.name}_product ON ${attribute.name}_product.id = product.${attribute.name}_product_id`,
                            )
                        }
                    }

                    if (attribute.type === "Number" || attribute.type === "String") {
                        if (hasColumn.length > 0) {
                            selects.push(`product.${attribute.name}`)
                        }
                    } else if (hasColumn.length === 0) {
                        const exists = await connection.query(`SELECT to_regclass('${attribute.name}_product');`)

                        if (exists[0].to_regclass) {
                            const enums = await connection.query(`
                                SELECT ${attribute.name}_name
                                FROM ${attribute.name}_product
                                WHERE ${attribute.name}_product.product_id = ${id}
                            `)

                            additionalEnums[attribute.name + "_enum"] = enums.map(
                                (item: any) => item[attribute.name + "_name"],
                            )
                        }
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

            const final = Object.assign(product[0], additionalEnums)

            res.json(final)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("filters/")
    public async filters(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { fields, limit, category, price, sort } = req.body
            const joins: any[] = []
            const wheres: any[] = []
            let ids: any = []
            const filteredCategory = category.filter((i: any) => i !== "")

            if (filteredCategory.length > 0) {
                wheres.push(`product.category_id IN (${filteredCategory.map((item: any) => item).join(", ")})`)
            }

            joins.push(`LEFT JOIN pricing ON product.price_id = pricing.id`)
            wheres.push(price.length > 0 ? `(price BETWEEN ${price[0]} AND ${price[1]})` : "")

            if (fields && fields.length > 0) {
                for (let i = 0; i < fields.length; i++) {
                    const keyAndVal: any = Object.entries(fields[i]).flat()
                    const key = Object.keys(fields[i])[0]

                    if (key) {
                        const hasColumn = await connection.query(`
                            SELECT column_name
                            FROM information_schema.columns
                            WHERE table_name='product' and column_name='${key}_product_id';
                        `)

                        if (hasColumn.length > 0) {
                            if (keyAndVal[1]) {
                                joins.push(`LEFT JOIN ${key}_product ON ${key}_product.id = product.${key}_product_id`)
                                wheres.push(`${keyAndVal[0]}_name = '${keyAndVal[1]}'`)
                            }
                        }

                        const exists = await connection.query(`SELECT to_regclass('${key.slice(0, -5)}_product');`)

                        if (exists[0].to_regclass) {
                            if (Array.isArray(fields[i][key]) && fields[i][key].length > 0) {
                                const productIDsFromEnums = await connection.query(`
                                    SELECT DISTINCT product_id 
                                    FROM ${key.slice(0, -5)}_product
                                    WHERE ${key.slice(0, -5)}_name IN (${fields[i][key]
                                    .map((item: any) => `'${item}'`)
                                    .join(", ")})
                                    ORDER BY product_id DESC
                                `)
                                console.log("____________________-")

                                // if (ids.length !== 0 && productIDsFromEnums.length < ids.length) {
                                ids = ids.concat(productIDsFromEnums.map((id: any) => id.product_id))
                                const newids = ids.filter((e: any, i: any, a: any) => a.indexOf(e) !== i)
                                // //}
                                if (newids.length !== 0) {
                                    ids = newids
                                }

                                // console.log(productIDsFromEnums)
                            }
                        }
                    }
                }
            }
            console.log(ids)

            const products = await connection.query(`
                    SELECT * FROM product
                    ${joins.join(" ")}
                    ${wheres.length > 0 ? "WHERE" : ""} ${wheres.filter((a) => a !== "").join(" AND ")}
                    LIMIT ${limit};
                `)

            for (let i = 0; i < products.length; i++) {
                const photos = await connection.query(`
                    SELECT *
                    FROM photo
                    WHERE photo.product_id = ${products[i].id}
                    limit 1;
                `)

                products[i].photos = photos
            }

            res.json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { table } = req.body
            const schema: any = await connection.getRepository(Schema).findOne({ table })

            // CREATE TABLES, ADD COLUMNS
            // PRICE
            await connection.query(`
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

            const existedPriceColumn = await connection.query(`
                    SELECT column_name
                    FROM information_schema.columns
                    WHERE table_name='product' and column_name='price_id';
                `)

            if (existedPriceColumn.length === 0) {
                await connection.query(`
                    CREATE TABLE IF NOT EXISTS pricing (
                        id SERIAL PRIMARY KEY,
                        price NUMERIC NOT NULL,
                        discount NUMERIC NOT NULL,
                        currency VARCHAR NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                `)

                await connection.query(`
                    ALTER TABLE product
                    ADD COLUMN price_id INT;
                `)

                await connection.query(`
                    ALTER TABLE product ADD CONSTRAINT fk_pricing_product FOREIGN KEY (price_id) REFERENCES pricing (id) MATCH FULL;
                `)
            }

            // CATEGORY
            const existedCategoryColumn = await connection.query(`
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name='product' and column_name='category_id';
            `)

            if (existedCategoryColumn.length === 0) {
                await connection.query(`ALTER TABLE product ADD COLUMN category_id INT;`)

                await connection.query(`
                    ALTER TABLE product ADD CONSTRAINT fk_category_product FOREIGN KEY (category_id) REFERENCES category (id) MATCH FULL;
                `)
            }
            // PHOTO
            await connection.query(`
                    CREATE TABLE IF NOT EXISTS photo (
                        id SERIAL PRIMARY KEY,
                        filename VARCHAR NOT NULL,
                        extension VARCHAR NOT NULL,
                        path VARCHAR NOT NULL,
                        product_id INT NOT NULL,
                        FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
                    );
                    `)

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
                            await connection.query(`
                                DO $$ BEGIN
                                    CREATE TYPE ${macro.name.toLowerCase() + "_enum"} AS ENUM ${
                                "(" + optionValues.join(", ") + ")"
                            };
                                EXCEPTION
                                    WHEN duplicate_object THEN null;
                                END $$;
                            `)

                            await connection.query(`
                                    CREATE TABLE IF NOT EXISTS ${macroTableName} (
                                        id SERIAL PRIMARY KEY,
                                        ${macro.name + "_name"} ${type === "ENUM" && macro.name + "_enum"} NOT NULL,
                                        type VARCHAR NOT NULL,
                                        ${
                                            type === "ENUM"
                                                ? `product_id INT NOT NULL, FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE`
                                                : ""
                                        }
                                    );
                                `)
                        } else {
                            await connection.query(`
                                    CREATE TABLE IF NOT EXISTS ${macroTableName} (
                                        id SERIAL PRIMARY KEY,
                                        ${macro.name + "_name"} ${type} NOT NULL,
                                        type VARCHAR NOT NULL
                                    );
                                `)

                            const existedColumn = await connection.query(`
                                    SELECT column_name
                                    FROM information_schema.columns
                                    WHERE table_name='${table}' and column_name='${macro.name + "_" + table + "_id"}';
                                `)

                            if (existedColumn.length === 0) {
                                await connection.query(`
                                        ALTER TABLE product
                                        ADD COLUMN ${macro.name + "_product_id"} INT;
                                    `)

                                await connection.query(`
                                        ALTER TABLE product 
                                        ADD CONSTRAINT ${"fk_" + macroTableName} 
                                        FOREIGN KEY (${macroTableName + "_id"}) 
                                        REFERENCES ${macroTableName} (id) MATCH FULL;
                                    `)
                            }
                        }
                    } else {
                        // Just add column to main table if it's not a macro
                        const columnType: any = selectType(attributes[i].type.toLowerCase())

                        await connection.query(`
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

        try {
            const { table, fields, mainProperties } = req.body
            const primaryProperties = JSON.parse(mainProperties)
            const parsedFields = JSON.parse(fields)
            const photos: any = req.files
            const names: any = []
            const values: any = []
            const enums: any = []

            // CATEGORY
            const getCategory = await connection.query(`SELECT id FROM category WHERE category.uuid = $1`, [
                primaryProperties.category,
            ])

            names.push("category_id")
            values.push(getCategory[0].id)

            // PRICE
            const priceID = await connection.query(
                `
                    INSERT INTO pricing(price, discount, currency)
                    VALUES 
                        ($1, $2, $3)
                    Returning id;
                `,
                [primaryProperties.price, primaryProperties.discount, primaryProperties.currency],
            )

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
                        const id = await connection.query(
                            `
                                INSERT INTO ${parsedFields[i].type + "_product"} (${
                                parsedFields[i].type + "_name"
                            }, type)
                                VALUES
                                    ($1, $2)
                                Returning id;
                            `,
                            [key, parsedFields[i].type],
                        )

                        // Then push that id into arrays with values and names to insert into main table
                        names.push(parsedFields[i].type + "_product_id")
                        values.push(id[0].id)
                    } else {
                        enums.push({ key, type: parsedFields[i].type })
                    }
                }
            }

            names.push("name", "description", "count")
            values.push(`'${primaryProperties.name}'`, `'${primaryProperties.description}'`, primaryProperties.count)

            // Insert into main table
            const productID = await connection.query(`
                    INSERT INTO product(${names.join(",")})
                    VALUES
                        (${values.join(", ")})
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

                await connection.query(
                    `
                    INSERT INTO photo(filename, extension, path, product_id)
                    VALUES 
                        ($1, $2, $3, $4);
                `,
                    [generated, "jpeg", `public/${generated}`, productID[0].id],
                )
            }

            for (let i = 0; i < enums.length; i++) {
                for (let j = 0; j < enums[i].key.length; j++) {
                    await connection.query(
                        `
                        INSERT INTO ${parsedFields[i].type + "_product"} (${
                            parsedFields[i].type + "_name"
                        }, type, product_id)
                        VALUES
                            ($1, $2, $3)
                    `,
                        [enums[i].key[j], parsedFields[i].type, productID[0].id],
                    )
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
            const { fields, mainProperties } = req.body
            const primaryProperties = JSON.parse(mainProperties)
            const parsedFields = JSON.parse(fields)
            const photos: any = req.files
            const fieldsSetStrings: any = []
            const enumVals: any = {}
            const existedMacrosArr: any = []

            if (parsedFields.length > 0) {
                for (let i = 0; i < parsedFields.length; i++) {
                    const key = Object.keys(parsedFields[i])[0]
                    const val = parsedFields[i][Object.keys(parsedFields[i])[0]]

                    const existedMacroTable = await connection
                        .getRepository(Macro)
                        .findOne({ name: parsedFields[i].type })

                    if (existedMacroTable) {
                        if (existedMacroTable.type === "enum") {
                            const existedMacro = await connection.query(`
                                    SELECT id, ${parsedFields[i].type + "_name"}
                                    FROM ${parsedFields[i].type + "_product"}
                                    WHERE product_id = ${primaryProperties.id}
                                `)

                            if (existedMacro.length > 0) {
                                await connection.query(`
                                    DELETE FROM ${key}_product
                                    WHERE product_id = ${primaryProperties.id}
                                `)
                            }

                            for (let i = 0; i < val.length; i++) {
                                await connection.query(
                                    `
                                    INSERT INTO ${key + "_product"} (${key + "_name"}, type, product_id)
                                    VALUES
                                        ($1, $2, $3)
                                    `,
                                    [val[i], key, primaryProperties.id],
                                )
                            }
                        } else {
                            const id = await connection.query(
                                `
                                    INSERT INTO ${key + "_product"} (${key + "_name"}, type)
                                    VALUES
                                        ($1, $2)
                                    RETURNING id
                                `,
                                [val, key],
                            )

                            fieldsSetStrings.push(`${key}_product_id = ${id[0].id}`)
                        }
                    } else {
                        if (parsedFields[i].type === "string" || parsedFields[i].type === "String") {
                            fieldsSetStrings.push(`${Object.keys(parsedFields[i])[0]} = '${val}'`)
                        } else {
                            fieldsSetStrings.push(`${Object.keys(parsedFields[i])[0]} = ${val}`)
                        }
                    }
                }
            }

            const category = await connection.query(
                `
                SELECT id
                FROM category
                WHERE category.uuid = $1
            `,
                [primaryProperties.category],
            )

            const newPrice = await connection.query(
                `
                INSERT INTO pricing (price, discount, currency)
                VALUES
                    ($1, $2, $3)
                RETURNING id;
            `,
                [primaryProperties.price, primaryProperties.discount, primaryProperties.currency],
            )

            await connection.query(
                `
                UPDATE product
                SET
                    name = $1,
                    description = $2,
                    count = $3,
                    price_id = $4,
                    category_id = $5,
                    updated_at = $7,
                    ${fieldsSetStrings.join(", ")}
                WHERE id = $6
            `,
                [
                    primaryProperties.name,
                    primaryProperties.description,
                    primaryProperties.count,
                    newPrice[0].id,
                    category[0].id,
                    primaryProperties.id,
                    new Date(),
                ],
            )

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

                    await connection.query(
                        `
                            INSERT INTO photo(filename, extension, path, product_id)
                            VALUES
                                ($1, $2, $3, $4);
                        `,
                        [generated, "jpeg", `public/${generated}`, primaryProperties.id],
                    )
                }
            }

            // console.log()
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
                if (err) {
                    throw err
                }

                for (const file of files) {
                    deletedPhotos.map((item: any) => {
                        if (item.filename === file) {
                            fs.unlink(path.join("public", file), (error: any) => {
                                if (error) {
                                    throw error
                                }
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
                if (err) {
                    throw err
                }

                for (const file of files) {
                    if (filename === file) {
                        fs.unlink(path.join("public", file), (error: any) => {
                            if (error) {
                                throw error
                            }
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
