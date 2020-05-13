import { Controller, Post, Get, Delete, Middleware } from "@overnightjs/core"
import { findDuplicates } from "../utils/findDuplicates"
import { getConnection, TableColumn, TableForeignKey } from "typeorm"
// import { jwtVerify } from "../utils/jwtVerify"
import { filterMany } from "../utils/filterMany"
import { Request, Response } from "express"
import * as multer from "multer"
import * as sharp from "sharp"
import { v4 } from "uuid"

import { Material } from "../entity/Material"
import { Category } from "../entity/Category"
import { Product } from "../entity/Product"
import { Options } from "../entity/Options"
import { Schema } from "../entity/Schema"
import { Brand } from "../entity/Brand"
import { Color } from "../entity/Color"
import { Price } from "../entity/Price"
import { Photo } from "../entity/Photo"
import { Macro } from "../entity/Macro"
import { Size } from "../entity/Size"
import { Care } from "../entity/Care"

const selectType = (type: string) => {
    if (type === "enum") {
        return "ENUM"
    }
    if (type === "number") {
        return "INT"
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

    @Get("schema/")
    public async getSchema(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const table: any = req.query.table

        try {
            const schema = await connection.getRepository(Schema).findOne({ table })

            res.json(schema)
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
        const { table }: any = req.query

        try {
            const schema: any = await connection.getRepository(Schema).findOne({ table })
            const parsedSchemaFields = JSON.parse(schema.schema)
            const allowedToFilter = []

            for (let i = 0; i < parsedSchemaFields.length; i++) {
                if (parsedSchemaFields[i].allowFilter) {
                    const fromQuery = await connection
                        .getRepository(Macro)
                        .find({
                            relations: ["options"],
                            where: { name: parsedSchemaFields[i].type },
                        })

                    allowedToFilter.push(fromQuery[0])
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
            const macro = await connection.getRepository(Macro).find()

            res.json(macro)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("createmacro/")
    public async createMacro(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { label, name, type, options, optionType, validators } = req.body
            const sameType = await connection.getRepository(Macro).findOne({ name })

            if (!sameType) {
                const macroProps = {
                    label,
                    name,
                    type,
                    validators,
                }

                const macro = new Macro()
                Object.assign(macro, macroProps)

                await connection.manager.save(macro)

                if (options && options.length > 0) {
                    options.map(async (option: any) => {
                        const optionsProps = {
                            label: option.label,
                            value: option.value,
                            meta: option.meta,
                            macro,
                        }

                        const newOption = new Options()
                        Object.assign(newOption, optionsProps)

                        await connection.manager.save(newOption)
                    })
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
            const schemaProps = {
                table: req.body.table,
                schema: JSON.stringify(req.body.attributes),
            }

            const schema = new Schema()
            Object.assign(schema, schemaProps)

            await connection.manager.save(schema)

            res.status(200).json(req.body)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("filters/")
    public async filters(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { fields, limit, table } = req.body
            const joins: any[] = []
            const wheres: any[] = []

            if (fields && fields.length > 0) {
                for (let i = 0; i < fields.length; i++) {
                    const keyAndVal: any = Object.entries(fields[i]).flat()
                    const key = Object.keys(fields[i])[0]
                   
                    if (key) {
                        joins.push(`LEFT JOIN ${key}_product_jacket ON ${key}_product_jacket.id = ${table}.${key}_${table}_id`)

                        if (keyAndVal[1]) {
                            if (keyAndVal[0] === "price") {
                                wheres.push(`(${keyAndVal[0]}_name BETWEEN ${keyAndVal[1]} AND 20)`)
                            } else {
                                wheres.push(`${keyAndVal[0]}_name = '${keyAndVal[1]}'`)
                            }
                        }
                    }
                }
            }
            
            const products = await connection.query(`
                SELECT * FROM ${table}
                ${joins.join(" ")}
                ${wheres.length > 0 ? "WHERE" : ""} ${wheres.join(" AND ")}
                LIMIT ${limit}
                ;
            `)
            res.json(products)

            // const { categories, colors, min, max, sizes, materials, offset, limit, order } = req.body
            // // console.log(categories)
            // const products = await connection
            //     .getRepository(Product)
            //     .query(`
            //         select *
            //         from product 
            //             left join price on product."pricePrimaryKey" = price."primaryKey"
            //             inner join photo on photo."productPrimaryKey" = product."primaryKey",
            //             product_categories_category as category,
            //             product_colors_color as color,
            //             product_sizes_size as size 
            //         where 
            //             (product."primaryKey" = category."productPrimaryKey"
            //             and category."categoryId" = any ($1))
            //             and(product."primaryKey" = color."productPrimaryKey"
            //             and color."colorId" = any ($2))
            //             and(product."primaryKey" = size."productPrimaryKey"
            //             and size."sizeId" = any ($3))
            //             and (price between $4 and $5)
            //         order by
            //             ${order}
            //     `, [categories, colors, sizes, min, max])

            // const unique = products.filter(((set) => (f: any) => !set.has(f.name) && set.add(f.name))(new Set()))

            // res.status(200).json(unique.slice(offset, limit))
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
            const parsedSchemaFields = JSON.parse(schema.schema)

            // CREATE TABLES, ADD COLUMNS
            // TODO: VALIDATIONS(but I'll do it in the main project)

            // Create main product table with just an idd because everything else will be generated
            await queryRunner.manager
                .query(`
                    CREATE TABLE IF NOT EXISTS ${table} (
                        id SERIAL PRIMARY KEY
                    );
                `)

            for (let i = 0; i < parsedSchemaFields.length; i++) {
                const macro = await connection.getRepository(Macro).findOne({ name: parsedSchemaFields[i].type })
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

                    if (!hasColumn) {
                        await queryRunner.addColumn(table, new TableColumn({
                            name: macro.name + "_" + table + "_id",
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
                    const columnType: any = selectType(parsedSchemaFields[i].type.toLowerCase())

                    await queryRunner.manager
                        .query(`
                            ALTER TABLE ${table}
                                ADD COLUMN IF NOT EXISTS ${parsedSchemaFields[i].name} ${columnType};
                            `)
                }

            }

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    @Post("insert/")
    public async insert(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { table, fields } = req.body
            const names: any = []
            const values: any = []

            // const fks = await queryRunner.manager
            //     .query(`
            //         SELECT r.conname
            //         ,ct.table_name
            //         ,pg_catalog.pg_get_constraintdef(r.oid, true) as condef
            //         FROM pg_catalog.pg_constraint r, information_schema.constraint_table_usage ct
            //         WHERE r.contype = 'f' 
            //         AND r.conname = ct.constraint_name
            //         AND ct.table_name != 'macro'
            //         ORDER BY 1
            //     `)

            for (let i = 0; i < fields.length; i++) {
                const existedMacroTable = await connection.getRepository(Macro).findOne({ name: fields[i].type })
                const key = fields[i][Object.keys(fields[i])[0]]

                if (!existedMacroTable) {
                    // Push data if it is not a macro 
                    names.push(Object.keys(fields[i])[0])

                    if (fields[i].type === "string" || fields[i].type === "String") {
                        values.push(`'${key}'`)
                    } else {
                        values.push(key)
                    }
                } else {
                    // First insert data to macro table and return id(needs for relation)
                    const id = await queryRunner.manager
                        .query(`
                            INSERT INTO ${fields[i].type + "_" + table} (${fields[i].type + "_name"}, type)
                            VALUES
                                ($1, $2)
                            Returning id;
                        `, [Array.isArray(key) ? key[0] : key, fields[i].type])

                    // Then push that id into arrays with values and names to insert into main table
                    names.push(fields[i].type + "_" + table + "_id")
                    values.push(id[0].id)

                }
            }

            // Insert into main table
            await queryRunner.manager
                .query(`
                    INSERT INTO ${table}(${names.join(",")})
                    VALUES
                        (${values.join(', ')});
                `)

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("setnewprice/:id")
    public async setNewPrice(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const product = await connection
                .getRepository(Product)
                .find({
                    join: {
                        alias: "product",
                        leftJoinAndSelect: {
                            price: "product.price",
                        },
                    },
                    where: { id: req.params.id },
                })

            const priceProps = {
                price: req.body.price,
                currency: req.body.currency,
                discount: req.body.discount,
                product: product[0],
            }
            const price = new Price()
            Object.assign(price, priceProps)

            await connection.manager.save(price)

            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Delete("deleteone/:id")
    public async deleteOne(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            await connection
                .createQueryBuilder()
                .delete()
                .from(Product)
                .where("id = :id", { id: req.params.id })
                .execute()

            res.status(200).json({ succuss: true })

        } catch (error) {
            res.status(400).json(error)
        }
    }
}
