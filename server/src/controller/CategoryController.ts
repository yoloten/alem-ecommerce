import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
// import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection, getManager } from "typeorm"

import { Category } from "../entity/Category"
import { Product } from "../entity/Product"

@Controller("api/category")
export class CategoryController {

    @Get("all/")
    public async getAll(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const trees = await connection
                .getTreeRepository(Category)
                .findTrees()

            res.json(trees)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("bygender/")
    public async oneByGender(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const name = req.query.gender
        
        try {
            const tree: any = await connection
                .getTreeRepository(Category)
                .findOne({ name })

            const childrenTree = await connection
                .getTreeRepository(Category)
                .findDescendantsTree(tree)

            res.json(childrenTree)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    // @Get("byparent/")
    // public async oneByParent(req: Request, res: Response): Promise<void> {
    //     const connection = getConnection()
    //     const name = req.query.name

    //     try {
    //         const tree: any = await connection
    //             .getTreeRepository(Category)
    //             .findOne({ name })

    //         const childrenTree = await connection
    //             .getTreeRepository(Category)
    //             .findDescendantsTree(tree)
            
    //         const lol = Object.values(childrenTree.children)
    //         const obj: any = {}

    //         for (let i = 0; i < lol.length; i++) {
    //             const products = await connection
    //                 .getRepository(Product)
    //                 .find({ category: lol[i] }) 
                
    //             obj[lol[i].name] = products.length
    //         }
            
    //         res.json(obj)
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // }

    @Post("create/")
    public async create(req: Request, res: Response): Promise<void> {
        const manager = getManager()

        try {
            if (req.body.name) {
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
            } else {
                res.status(400).json({ msg: "Please add name parameter" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Put("update/")
    public async update(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            await getConnection()
                .createQueryBuilder()
                .update(Category)
                .set({ name: req.body.name })
                .where("id = :id", { id: parseInt(req.body.id, 10) })
                .execute()

            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
