import { Controller, Post, Get, Delete, Middleware } from "@overnightjs/core"
import { findDuplicates } from "../utils/findDuplicates"
import { getConnection, Between, In } from "typeorm"
// import { jwtVerify } from "../utils/jwtVerify"
import { filterMany } from "../utils/filterMany"
import { Request, Response } from "express"
import * as multer from "multer"
import * as sharp from "sharp"
import { v4 } from "uuid"

import { Material } from "../entity/Material"
import { Category } from "../entity/Category"
import { Product } from "../entity/Product"
import { Brand } from "../entity/Brand"
import { Color } from "../entity/Color"
import { Price } from "../entity/Price"
import { Photo } from "../entity/Photo"
import { Size } from "../entity/Size"
import { Care } from "../entity/Care"

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

    @Get("onebyprimarykey/")
    public async getOneByPrimaryKey(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
      
        try {
            const product = await connection
                .getRepository(Product)
                .findOne({
                    join: {
                        alias: "product",
                        leftJoinAndSelect: {
                            price: "product.price",
                            photos: "product.photos",
                            colors: "product.colors",
                            brand: "product.brand",
                            sizes: "product.sizes",
                            materials: "product.materials",
                            care: "product.care",
                        },
                    },
                    where: { primaryKey: req.query.primarykey },
                })

            res.json(product)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("productbygender/")
    public async productByGender(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const gender = [req.query.gender]

        try {
            const resultFromCategory: number[] = await filterMany(gender, Category, connection, Product, "category")

            if (resultFromCategory.length > 0) {
                const product = await connection
                    .createQueryBuilder(Product, "product")
                    .select("product")
                    .leftJoinAndSelect("product.photos", "photos")
                    .leftJoinAndSelect("product.categories", "categories")
                    .leftJoinAndSelect("product.sizes", "sizes")
                    .leftJoinAndSelect("product.colors", "colors")
                    .leftJoinAndSelect("product.price", "price")
                    .where(resultFromCategory.map((id) => ({ primaryKey: id })))
                    .orderBy("product.createdAt", "DESC")
                    .getMany()

                res.json(product)
            } else {
                res.send(" ")
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("filters/")
    public async filters(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { categories, colors, min, max, sizes, materials, offset, limit, order } = req.body
            // console.log(categories)
            const products = await connection
                .getRepository(Product)
                .query(`
                    select *
                    from product 
                        left join price on product."pricePrimaryKey" = price."primaryKey"
                        inner join photo on photo."productPrimaryKey" = product."primaryKey",
                        product_categories_category as category,
                        product_colors_color as color,
                        product_sizes_size as size 
                    where 
                        (product."primaryKey" = category."productPrimaryKey"
                        and category."categoryId" = any ($1))
                        and(product."primaryKey" = color."productPrimaryKey"
                        and color."colorId" = any ($2))
                        and(product."primaryKey" = size."productPrimaryKey"
                        and size."sizeId" = any ($3))
                        and (price between $4 and $5)
                    order by
                        ${order}
                `, [categories, colors, sizes, min, max])

            const unique = products.filter(((set) => (f: any) => !set.has(f.name) && set.add(f.name))(new Set()))
            
            res.status(200).json(unique.slice(offset, limit))
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    @Middleware(upload.array("photos", 6))
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { colors, materials, sizes, cares, brand, categories } = req.body

            const productBrand = await connection
                .getRepository(Brand)
                .findOne({ name: brand })

            const productCategory = await connection
                .getRepository(Category)
                .find({ where: categories.map((category: string) => ({ name: category })) })

            const colorList = await connection
                .getRepository(Color)
                .find({ where: colors.map((color: string) => ({ name: color })) })

            const materialList = await connection
                .getRepository(Material)
                .find({ where: materials.map((material: string) => ({ name: material })) })

            const sizeList = await connection
                .getRepository(Size)
                .find({ where: sizes.map((size: string) => ({ name: size })) })

            const careList = await connection
                .getRepository(Care)
                .find({ where: cares.map((care: string) => ({ name: care })) })

            if (brand && categories) {
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
                    categories: productCategory,
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

                const photos = Object.values(req.files)

                await Promise.all(
                    photos.map(async (file) => {
                        const extension = file.mimetype.split("/")
                        const generated = v4() + "." + extension[1]

                        await sharp(file.buffer)
                            .resize(1024, 640)
                            .toFormat("jpeg")
                            .jpeg({ quality: 100 })
                            .toFile(`public/${generated}`)

                        const photoProps = {
                            filename: generated,
                            extension: extension[1],
                            path: `public/${generated}`,
                            size: file.size,
                            product,
                        }
                        const photo = new Photo()
                        Object.assign(photo, photoProps)

                        await connection.manager.save(photo)
                    }),
                )

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
