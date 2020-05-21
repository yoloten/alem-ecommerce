import { Controller, Post, Get, Middleware, Put, Delete } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection, getManager } from "typeorm"

@Controller("api/category")
export class CategoryController {

    @Get("one/")
    public async getOne(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { uuid } = req.query
            let count = [{ count: "0" }]

            if (!uuid) {
                count = await connection
                    .query(`
                        SELECT 
                        COUNT(*) 
                        FROM category
                    `)
            }

            const category = await connection
                .query(`
                    SELECT * 
                    FROM category 
                    WHERE ${!uuid ? "category.index = 0" : `category.uuid = '${uuid}'`}
                `)
                
            if (uuid) {
                category[0].children = category[0].children.split(", ")

                for (let i = 0; i < category[0].children.length; i++) {
                    const child = await connection
                        .query(`
                            SELECT * 
                            FROM category 
                            WHERE category.uuid = $1
                        `,
                            [category[0].children[i]])

                    category[0].children[i] = child[0]
                }
            }

            res.json({ category, count: parseInt(count[0].count, 10) })

        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("last/")
    public async getLast(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const category = await connection
                .query(`
                    SELECT * 
                    FROM category 
                    WHERE category.children = ''
                `)
                
            res.json(category)

        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const allCategories = await connection.query(`SELECT * FROM category ORDER BY category.index ASC`)

            for (let i = 0; i < allCategories.length; i++) {
                if (allCategories[i].children) {
                    allCategories[i].children = allCategories[i].children.split(", ")
                } else {
                    allCategories[i].children = []
                }
            }

            res.json(allCategories)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("bygender/")
    public async oneByGender(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            res.json()
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
                await queryRunner.manager
                    .query(`
                        CREATE TABLE IF NOT EXISTS category (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR NOT NULL,
                            parent VARCHAR,
                            uuid VARCHAR NOT NULL,
                            created_index INT NOT NULL, 
                            index INT NOT NULL,
                            children VARCHAR
                        );
                    `)

                const existedCategory = await queryRunner.manager
                    .query(`
                        SELECT * 
                        FROM category
                        WHERE uuid = '${tree[i].uuid}';
                    `)

                if (existedCategory.length < 1) {
                    await queryRunner.manager
                        .query(`
                            INSERT INTO category (name, parent, uuid, created_index, index, children)
                            VALUES
                                ($1, $2, $3, $4, $5, $6);
                        `, [
                            tree[i].name,
                            tree[i].parent,
                            tree[i].uuid,
                            tree[i].created_index,
                            tree[i].index,
                            tree[i].children.join(", "),
                        ])
                } else {
                    await queryRunner.manager
                        .query(`
                            UPDATE category
                            SET name = $1,
                                parent = $2,
                                uuid = $3,
                                created_index = $4,
                                index = $5,
                                children = $6
                            WHERE id = $7
                        `, [
                            tree[i].name,
                            tree[i].parent,
                            tree[i].uuid,
                            tree[i].created_index,
                            tree[i].index,
                            tree[i].children.join(", "),
                            existedCategory[0].id,
                        ])
                }

            }
            // if (req.body.name) {
            //     const category = await manager
            //         .createQueryBuilder(Category, "category")
            //         .where("category.name = :name", { name: req.body.name })
            //         .getOne()

            //     if (category) {
            //         res.status(400).json({ msg: "This category is already exists" })
            //     } else {
            //         if (req.body.parent) {
            //             const parent: any = await manager.getRepository(Category).findOne(parseInt(req.body.parent, 10))
            //             const child = new Category()
            //             child.name = req.body.name
            //             child.parent = parent

            //             await manager.save(child)
            //         } else {
            //             const parentNode = new Category()
            //             parentNode.name = req.body.name

            //             await manager.save(parentNode)
            //         }

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

    // @Put("update/")
    // public async update(req: Request, res: Response): Promise<void> {
    //     const connection = getConnection()

    //     try {
    //         await getConnection()
    //             .createQueryBuilder()
    //             .update(Category)
    //             .set({ name: req.body.name })
    //             .where("id = :id", { id: parseInt(req.body.id, 10) })
    //             .execute()

    //         res.status(200).json({ success: true })
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // }
}
