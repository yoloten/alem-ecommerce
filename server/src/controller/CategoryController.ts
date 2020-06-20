import { Controller, Post, Get, Middleware, Put, Delete } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection, getManager } from "typeorm"

@Controller("api/category")
export class CategoryController {
    @Get("forfilter/")
    public async forFilter(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { id } = req.query
            let children: any = []
            let productCount = [{ count: "0" }]

            const category = await connection.query(
                `
                    SELECT * 
                    FROM category 
                    WHERE category.id = $1;
                `,
                [parseInt(id, 10)],
            )

            if (category[0].children.length === 0) {
                productCount = await connection.query(
                    `
                        SELECT 
                        COUNT(*) 
                        FROM product 
                        WHERE product.category_id = $1;
                    `,
                    [parseInt(id, 10)],
                )
            } else {
                children = await connection.query(`
                        SELECT * 
                        FROM category 
                        WHERE category.uuid IN (${category[0].children.map((item: any) => `'${item}'`).join(", ")});
                    `)

                for (let i = 0; i < children.length; i++) {
                    const childrenProductCount = await connection.query(
                        `
                            SELECT 
                            COUNT(*) 
                            FROM product 
                            WHERE product.category_id = $1;
                        `,
                        [children[i].id],
                    )

                    productCount.push(childrenProductCount[0])
                    children[i].count = childrenProductCount[0].count
                }
            }

            res.json({ category, productCount, children })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("one/")
    public async getOne(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { uuid } = req.query
            let count = [{ count: "0" }]

            if (!uuid) {
                count = await connection.query(`
                        SELECT 
                        COUNT(*) 
                        FROM category
                    `)
            }

            const category = await connection.query(`
                    SELECT * 
                    FROM category 
                    WHERE ${!uuid ? "category.index = 0" : `category.uuid = '${uuid}'`}
                `)

            if (uuid) {
                category[0].children = category[0].children.split(", ")

                for (let i = 0; i < category[0].children.length; i++) {
                    const child = await connection.query(
                        `
                            SELECT * 
                            FROM category 
                            WHERE category.uuid = $1
                        `,
                        [category[0].children[i]],
                    )

                    category[0].children[i] = child[0]
                }
            }

            res.json({ category, count: parseInt(count[0].count, 10) })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("fornavbar/")
    public async getForNav(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const category = await connection.query(`
                    SELECT name, id 
                    FROM category 
                    WHERE category.chosen_for_nav = true
                `)

            res.json(category)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("last/")
    public async getLast(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const category = await connection.query(`
                        SELECT * 
                        FROM category 
                        WHERE category.children = '{}'
                    `)

            if (category) {
                res.json(category)
            } else {
                res.json({ msg: "No category" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const allCategories = await connection.query(`SELECT * FROM category ORDER BY category.index ASC`)

            if (allCategories) {
                res.json(allCategories)
            } else {
                res.json({ msg: "No category" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("subcategoriesandallproducts/")
    public async subCategories(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { parent } = req.query
            const children: any = []
            const products: any = []

            const category = await connection.query(
                `
                    SELECT *
                    FROM category 
                    WHERE category.id = $1;
                    `,
                [parseInt(parent, 10)],
            )

            for (let i = 0; i < category[0].children.length; i++) {
                const child = await connection.query(
                    `
                        SELECT * 
                        FROM category 
                        WHERE category.uuid = $1;
                        `,
                    [category[0].children[i]],
                )

                children.push(child[0])
            }

            const childrenForAllProducts = await connection.query(`
                    SELECT id, parents
                    FROM category 
                    WHERE ('${category[0].uuid}')=ANY(category.parents);
                `)

            const existedTable = await queryRunner.getTable("product")

            if (childrenForAllProducts.length > 0 && existedTable) {
                const productWithCategory = await connection.query(`
                        SELECT 
                            product.name, 
                            product.id,
                            pricing.price,
                            pricing.discount,
                            pricing.currency
                        FROM product 
                        LEFT JOIN pricing ON product.price_id = pricing.id
                        WHERE product.category_id IN (${childrenForAllProducts
                            .map((subCategory: any) => subCategory.id)
                            .join(", ")});
                    `)

                if (productWithCategory && productWithCategory.length > 0) {
                    for (let j = 0; j < productWithCategory.length; j++) {
                        const photos = await connection.query(`
                                SELECT *
                                FROM photo
                                WHERE photo.product_id = (${productWithCategory[j].id})
                            `)

                        productWithCategory[j].photos = photos
                    }
                }

                products.push(productWithCategory)
            }

            res.json({ children, products: products.length > 0 ? products.flat() : [] })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("choosefornav/")
    public async chooseForNav(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { categories } = req.body

            for (let i = 0; i < categories.length; i++) {
                await connection.query(
                    `
                        UPDATE category
                        SET chosen_for_nav = true
                        WHERE uuid = $1
                    `,
                    [categories[i]],
                )
            }

            res.json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { tree } = req.body

            for (let i = 0; i < tree.length; i++) {
                await connection.query(`
                        CREATE TABLE IF NOT EXISTS category (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR NOT NULL,
                            parents VARCHAR [],
                            uuid VARCHAR NOT NULL,
                            created_index INT NOT NULL, 
                            index INT NOT NULL,
                            chosen_for_nav BOOLEAN DEFAULT FALSE,
                            children VARCHAR []
                        );
                    `)

                const existedCategory = await connection.query(`
                        SELECT * 
                        FROM category
                        WHERE uuid = '${tree[i].uuid}';
                    `)

                if (existedCategory.length < 1) {
                    await connection.query(
                        `
                            INSERT INTO category (name, parents, uuid, created_index, index, children, chosen_for_nav)
                            VALUES
                                ($1, $2, $3, $4, $5, $6, $7);
                        `,
                        [
                            tree[i].name,
                            tree[i].parents,
                            tree[i].uuid,
                            tree[i].created_index,
                            tree[i].index,
                            tree[i].children,
                            tree[i].created_index === 1 ? true : false,
                        ],
                    )
                } else {
                    await connection.query(
                        `
                            UPDATE category
                            SET name = $1,
                                parents = $2,
                                uuid = $3,
                                created_index = $4,
                                index = $5,
                                children = $6,
                                chosen_for_nav = $8
                            WHERE id = $7
                        `,
                        [
                            tree[i].name,
                            tree[i].parents,
                            tree[i].uuid,
                            tree[i].created_index,
                            tree[i].index,
                            tree[i].children,
                            existedCategory[0].id,
                            tree[i].created_index === 1 ? true : false,
                        ],
                    )
                }
            }

            res.status(200).json({ success: true })
            //     }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Delete("delete/")
    public async delete(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            await connection.query(`DELETE FROM category WHERE category.uuid = $1`, [req.body.uuid])
            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
