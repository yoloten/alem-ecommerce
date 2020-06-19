import { Controller, Post, Get, Delete, Middleware, Put } from "@overnightjs/core"
import { findDuplicates } from "../utils/findDuplicates"
import { getConnection } from "typeorm"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"

import { Options } from "../entity/Options"
import { Schema } from "../entity/Schema"
import { Macro } from "../entity/Macro"

@Controller("api/product/attributes")
export class ProductAttributesController {
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
            console.log(macro)
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
                        const fromQuery = await connection.getRepository(Macro).find({
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
                            name: req.body[i].name.toLowerCase().split(" ").join("_"),
                            validatorsList: req.body[i].validatorsList.join(", "),
                            validators: req.body[i].validators,
                            selectable: req.body[i].selectable,
                            label: req.body[i].label,
                            type: req.body[i].type,
                            uuid: req.body[i].uuid,
                        }

                        const macro = new Macro()
                        Object.assign(macro, macroProps)

                        await connection.manager.save(macro)

                        if (req.body[i].options && req.body[i].options.length > 0) {
                            req.body[i].options.map(async (option: any) => {
                                const optionsProps = {
                                    name: option.name.toLowerCase().split(" ").join("_"),
                                    label: option.label,
                                    value: option.value,
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
                                name: req.body[i].name.toLowerCase().split(" ").join("_"),
                                validators: req.body[i].validators,
                                selectable: req.body[i].selectable,
                                label: req.body[i].label,
                                type: req.body[i].type,
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
                                        name: option.name.split(" ").join("_"),
                                        label: option.label,
                                        value: option.value,
                                        macro: existedMacro,
                                        meta: option.meta,
                                        uuid: option.uuid,
                                    }

                                    const newOption = new Options()
                                    Object.assign(newOption, optionsProps)

                                    await connection.manager.save(newOption)
                                } else {
                                    await getConnection()
                                        .createQueryBuilder()
                                        .update(Options)
                                        .set({
                                            name: option.name.toLowerCase().split(" ").join("_"),
                                            label: option.label,
                                            value: option.value,
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
}
