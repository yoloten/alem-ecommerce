import { Controller, Post, Get, Delete, Middleware } from "@overnightjs/core"
import { findDuplicates } from "../utils/findDuplicates"
import { getConnection, Between, In } from "typeorm"
// import { jwtVerify } from "../utils/jwtVerify"
import { filterMany } from "../utils/filterMany"
import { Request, Response } from "express"

import { Material } from "../entity/Material"
import { Category } from "../entity/Category"
import { Product } from "../entity/Product"
import { Brand } from "../entity/Brand"
import { Color } from "../entity/Color"
import { Price } from "../entity/Price"
import { Size } from "../entity/Size"
import { Care } from "../entity/Care"

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

    @Post("filters/")
    public async filters(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { category, colors, min, max, sizes, materials, skip, take, order } = req.body
            const resultFromColor = await filterMany(colors, Color, connection, Product, "color")
            const resultFromSize = await filterMany(sizes, Size, connection, Product, "size")
            const resultFromMaterial = await filterMany(materials, Material, connection, Product, "material")
            let results = []

            if (resultFromColor.length === 0 || resultFromSize.length === 0 || resultFromMaterial.length === 0) {
                results = []
            } else {
                results = resultFromColor.concat(resultFromSize).concat(resultFromMaterial)
            }

            results = findDuplicates(results)

            const price = await connection.getRepository(Price).find({ price: Between(min, max) })
            const priceList = price.map((item) => item.primaryKey)

            const products = await connection
                .createQueryBuilder(Product, "product")
                .select("product")
                .leftJoinAndSelect("product.price", "price")
                .leftJoinAndSelect("product.colors", "colors")
                .leftJoinAndSelect("product.category", "category")
                .leftJoinAndSelect("product.sizes", "sizes")
                .leftJoinAndSelect("product.materials", "materials")
                .leftJoinAndSelect("product.care", "care")
                .where(results.length > 0 ? results.map((id) => {
                    return {
                        primaryKey: parseInt(id, 10),
                        category: parseInt(category, 10),
                        price: In(priceList)
                    }
                })
                    : {
                        category: parseInt(category, 10),
                        price: In(priceList)
                    })
                .orderBy({ "price.price": order })
                .skip(skip)
                .take(take)
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
            const { colors, materials, sizes, cares, brand, category } = req.body

            const productBrand = await connection
                .getRepository(Brand)
                .findOne({ name: brand })

            const productCategory = await connection
                .getRepository(Category)
                .findOne({ name: category })

            const colorList = await connection
                .getRepository(Color)
                .find({
                    where: colors.map((color: string) => {
                        return { name: color }
                    })
                })

            const materialList = await connection
                .getRepository(Material)
                .find({
                    where: materials.map((material: string) => {
                        return { name: material }
                    })
                })

            const sizeList = await connection
                .getRepository(Size)
                .find({
                    where: sizes.map((size: string) => {
                        return { name: size }
                    })
                })

            const careList = await connection
                .getRepository(Care)
                .find({
                    where: cares.map((care: string) => {
                        return { name: care }
                    })
                })

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
                    description: req.body.description,
                    quantity: req.body.quantity,
                    name: req.body.name,
                    category: productCategory,
                    materials: materialList,
                    brand: productBrand,
                    colors: colorList,
                    care: careList,
                    sizes: sizeList,
                    price,
                }

                const product = new Product()
                Object.assign(product, productProps)

                await connection.manager.save(product)

                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ msg: "You forgot to add some of the properties" })
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
