import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection } from "typeorm"

import { Material } from "../entity/Material"

@Controller("api/material")
export class MaterialController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const materials = await connection.getRepository(Material).find()

            res.json(materials)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            if (req.body.name) {
                const material = await connection
                    .getRepository(Material)
                    .createQueryBuilder("material")
                    .where("material.name = :name", { name: req.body.name })
                    .getOne()

                if (material) {
                    res.status(400).json({ msg: "This material is already exists" })
                } else {
                    await connection
                        .createQueryBuilder()
                        .insert()
                        .into(Material)
                        .values([{ name: req.body.name }])
                        .execute()

                    res.status(200).json({ success: true })
                }
            } else {
                res.status(400).json({ msg: "Please add name parameter" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Put("update/")
    public async update(req: Request, res: Response): Promise<void> {

        try {
            await getConnection()
                .createQueryBuilder()
                .update(Material)
                .set({ name: req.body.name })
                .where("id = :id", { id: parseInt(req.body.id, 10) })
                .execute()

            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
