import { Controller, Post, Get, Middleware } from "@overnightjs/core"
import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import { getConnection } from "typeorm"
import { secret } from "../keys/secret"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"


import { User } from "../entity/User"

const saltRounds = 10

@Controller("api/user")
export class UserController {

    @Post("register/")
    public async register(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const user = await connection
                .getRepository(User)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: req.body.email })
                .getOne()

            if (user) {
                res.status(400).json({ msg: "This user is already exists" })
            } else {
                const hash = await bcrypt.hash(req.body.password, saltRounds)
                req.body.password = hash

                await connection
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values([{
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    }])
                    .execute()

                res.status(200).json({ success: true })
            }
        } catch (error) {
            console.log(error)
        }
    }

    @Post("login/")
    public async login(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const user = await connection
                .getRepository(User)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: req.body.email })
                .getOne()
            
            if (!user) {
                res.status(404).json({ msg: "User not found" })
            } else {
                const isMatch = await bcrypt.compare(req.body.password, user.password)
               
                if (isMatch) {
                    const payload = {
                        name: user.name,
                        id: user.id,
                        email: user.email,
                    }

                    const token = jwt.sign(payload, secret.secretOrKey, { expiresIn: 3600 * 24})

                    res.json({ success: true, token: "Bearer " + token })
                } else {
                    res.status(400).json({ msg: "Invalid password or email" })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
} 
