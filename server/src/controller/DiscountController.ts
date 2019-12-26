import { Controller, Post, Get, Middleware } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection } from "typeorm"

import { Discount } from "../entity/Discount"
import { Product } from "../entity/Product"


@Controller("api/discount")
export class DiscountController {

    // @Get("alljoined/:id")
    // public async getAll(req: Request, res: Response): Promise<void> {
    //     const connection = getConnection()

    //     try {
    //         const products = await connection
    //             .createQueryBuilder("discount")
    //             .leftJoinAndSelect("discount.products", "discount")
    //             .where("discount.id = :id", { id: req.params.id })

    //         res.json(products)
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const date = new Date()
            
            await connection
                .createQueryBuilder()
                .insert()
                .into(Discount)
                .values([{
                    discount: req.body.discount,
                    expiredAt: new Date(date.setTime(req.body.expiredAt)),
                }])
                .execute()

            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    // @Post("update/")
    // public async update(req: Request, res: Response): Promise<void> {
    //     const connection = getConnection()

    //     try {
    //         await getConnection()
    //             .createQueryBuilder()
    //             .update(Brand)
    //             .set({ name: req.body.name })
    //             .where("id = :id", { id: parseInt(req.body.id, 10) })
    //             .execute()

    //         res.status(200).json({ success: true })
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // }
}