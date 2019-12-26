import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection } from "typeorm"

import { Brand } from "../entity/Brand"

@Controller("api/brand")
export class BrandController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const brands = await connection.getRepository(Brand).find()

            res.json(brands)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            if (req.body.name) {
                const brand = await connection
                    .getRepository(Brand)
                    .createQueryBuilder("brand")
                    .where("brand.name = :name", { name: req.body.name })
                    .getOne()

                if (brand) {
                    res.status(400).json({ msg: "This brand is already exists" })
                } else {
                    await connection
                        .createQueryBuilder()
                        .insert()
                        .into(Brand)
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
        const connection = getConnection()

        try {
            await getConnection()
                .createQueryBuilder()
                .update(Brand)
                .set({ name: req.body.name })
                .where("id = :id", { id: parseInt(req.body.id, 10) })
                .execute()

            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
