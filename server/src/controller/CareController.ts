import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection } from "typeorm"

import { Care } from "../entity/Care"

@Controller("api/care")
export class CareController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const care = await connection.getRepository(Care).find()

            res.json(care)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            if (req.body.name) {
                const care = await connection
                    .getRepository(Care)
                    .createQueryBuilder("care")
                    .where("care.name = :name", { name: req.body.name })
                    .getOne()

                if (care) {
                    res.status(400).json({ msg: "This care is already exists" })
                } else {
                    await connection
                        .createQueryBuilder()
                        .insert()
                        .into(Care)
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
                .update(Care)
                .set({ name: req.body.name })
                .where("id = :id", { id: parseInt(req.body.id, 10) })
                .execute()

            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}