import { Controller, Post, Get, Put, Delete, Middleware } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection } from "typeorm"

import { Price } from "../entity/Price"
import { Category } from "../entity/Category"
import { Product } from "../entity/Product"
import { Brand } from "../entity/Brand"

@Controller("api/product")
export class ProductController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const products = await connection.getRepository(Product).find({ relations: ["price"] })

            res.json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("onebyid/:id")
    public async getOneById(req: Request, res: Response): Promise<void> {
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

            res.json(product)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const brand = await connection.getRepository(Brand).findOne({ name: req.body.brand })
            const category = await connection.getRepository(Category).findOne({ name: req.body.category })

            if (brand && category) {
                const priceObj = new Price()
                priceObj.price = req.body.price
                priceObj.currency = req.body.currency
                priceObj.discount = req.body.discount
                await connection.manager.save(priceObj)

                await connection
                    .createQueryBuilder()
                    .insert()
                    .into(Product)
                    .values([{
                        name: req.body.name,
                        description: req.body.description,
                        colors: req.body.colors,
                        quantity: req.body.quantity,
                        material: req.body.material,
                        care: req.body.care,
                        size: req.body.size,
                        price: priceObj,
                        brand,
                        category,
                    }])
                    .execute()

                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ msg: "You forgot to add brand or category. Or both of them" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Put("setdiscount/:id")
    public async setdiscount(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            if (req.body.discount) {
                await connection
                    .createQueryBuilder()
                    .update(Price)
                    .set({ discount: req.body.discount })
                    .where("id = :id", { id: req.params.id })
                    .execute()

                res.status(200).json({ succuss: true })
            } else {
                res.status(400).json({ msg: "You didn't provide discount" })
            }
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
