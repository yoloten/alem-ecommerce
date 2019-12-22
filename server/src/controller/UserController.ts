import { Controller, Post, Get } from "@overnightjs/core"
import { Request, Response } from "express" 
import { getConnection } from "typeorm"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"

@Controller("api/user")
export class UserController {

    @Post("/")
    public async post(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
           const savedUser = await connection.manager.save(connection.manager.create(User, req.body))
           res.json(savedUser)
        } catch (error) {
            console.log(error)
        }
    }

} 
