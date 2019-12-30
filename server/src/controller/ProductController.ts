import { Controller, Post, Get, Delete, Middleware } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection, Between } from "typeorm"

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

    @Get("filters/")
    public async filterByPrice(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        // .getRepository(Product)
        // .query(`
        //     select *
        //     from product
        //     left join price on "pricePrimaryKey" = price."primaryKey"
        //     where "categoryId" = $1 and price between $2 and $3    
        // `, params)

        try {
            const { category, colors, min, max } = req.body
            // const params = [parseInt(category, 10), min, max, colors]
            const products = await connection
                .createQueryBuilder(Product, "product")
                .select("product")
                .leftJoinAndSelect("product.price", "price")
                .where("product.category = :category", { category: parseInt(category, 10) })
                .andWhere("price.price BETWEEN :min AND :max ", {
                    min: req.body.min,
                    max: req.body.max,
                })
                .getMany()

            res.status(200).json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const brand = await connection
                .getRepository(Brand)
                .findOne({ name: req.body.brand })
                
            const category = await connection
                .getRepository(Category)
                .findOne({ name: req.body.category })

            if (brand && category) {
                const priceProps = {
                    price: req.body.price,
                    currency: req.body.currency,
                    discount: req.body.discount,
                }

                const price = new Price()
                Object.assign(price, priceProps)

                await connection.manager.save(price)

                const productProps = {
                    name: req.body.name,
                    description: req.body.description,
                    colors: req.body.colors,
                    quantity: req.body.quantity,
                    material: req.body.material,
                    care: req.body.care,
                    size: req.body.size,
                    brand,
                    category,
                    price,
                }

                const product = new Product()
                Object.assign(product, productProps)

                await connection.manager.save(product)

                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ msg: "You forgot to add brand or category. Or both of them" })
            }
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
