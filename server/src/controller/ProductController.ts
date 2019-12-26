import { Controller, Post, Get, Put, Middleware } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection } from "typeorm"

import { Discount } from "../entity/Discount"
import { Category } from "../entity/Category"
import { Product } from "../entity/Product"
import { Brand } from "../entity/Brand"

@Controller("api/product")
export class ProductController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const products = await connection.getRepository(Product).find()

            res.json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("withdiscount/")
    public async getProductWithDiscount(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const products = await connection
                .getRepository(Product)
                .createQueryBuilder("product")
                .leftJoinAndSelect(Discount, "discount", "discount.primaryKey = product.discount")
                .getMany()

            res.json(products)
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
                await connection
                    .createQueryBuilder()
                    .insert()
                    .into(Product)
                    .values([{
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        colors: req.body.colors,
                        quantity: req.body.quantity,
                        material: req.body.material,
                        care: req.body.care,
                        size: req.body.size,
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

    @Put("setdiscount/:productid/:discountid")
    public async setdiscount(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const discount: any = await connection
                .getRepository(Discount)
                .findOne({ id: req.params.discountid })

            await getConnection()
                .createQueryBuilder()
                .update(Product)
                .set({ discount })
                .where("id = :id", { id: req.params.productid })
                .execute()

            res.status(200).json({ succuss: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
