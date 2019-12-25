import { Controller, Post, Get, Middleware } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection, getManager } from "typeorm"

import { Category } from "../entity/Category"

@Controller("api/category")
export class CategoryController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const trees = await connection.getTreeRepository(Category).findTrees()

            res.json(trees)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("onebyid/:id")
    public async getOneById(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const id = parseInt(req.params.id, 10)

        try {
            const tree = await connection.getTreeRepository(Category).findOne(id)

            res.json(tree)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const manager = getManager()

        try {
            const category = await manager
                .createQueryBuilder(Category, "category")
                .where("category.name = :name", { name: req.body.name })
                .getOne()

            if (category) {
                res.status(400).json({ msg: "This category is already exists" })
            } else {

                if (req.body.parent) {
                    const parent: any = await manager.getRepository(Category).findOne(parseInt(req.body.parent, 10))
                    const child = new Category()
                    child.name = req.body.name
                    child.parent = parent

                    await manager.save(child)
                } else {
                    const parentNode = new Category()
                    parentNode.name = req.body.name

                    await manager.save(parentNode)
                }

                res.status(200).json({ success: true })
            }

        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("update/")
    public async update(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
       
        try {
            const category = await connection
                .getRepository(Category)
                .createQueryBuilder("category")
                .where("category.name = :name", { name: req.body.name })
                .getOne()
            
            if (category) {
                res.status(400).json({ msg: "This category has the same name" })
            } else {
                await getConnection()
                .createQueryBuilder()
                .update(Category)
                .set({ name: req.body.name })
                .where("id = :id", { id: parseInt(req.body.id, 10) })
                .execute()

                res.status(200).json({ success: true })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
