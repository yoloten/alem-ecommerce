import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection, getManager } from "typeorm"

@Controller("api/category")
export class CategoryController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            res.json()
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
                            created_index INT NOT NULL
                        );
                    `)

                const existedCategory = await queryRunner.manager
                    .query(`
                        SELECT * 
                        FROM category
                        WHERE uuid = '${tree[i].uuid}';
                    `)
                console.log(existedCategory)
                if (existedCategory.length < 1) {
                    await queryRunner.manager
                        .query(`
                            INSERT INTO category (name, parent, uuid, created_index)
                            VALUES
                                ($1, $2, $3, $4);
                        `, [tree[i].name, tree[i].parent, tree[i].uuid, tree[i].createdIndex])
                } else {
                    await queryRunner.manager
                        .query(`
                            UPDATE category
                            SET name = $1,
                                parent = $2,
                                uuid = $3,
                                created_index = $4
                            WHERE id = $5
                        `, [tree[i].name, tree[i].parent, tree[i].uuid, tree[i].createdIndex, existedCategory.id])
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
