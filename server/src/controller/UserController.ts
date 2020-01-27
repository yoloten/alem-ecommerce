import { Controller, Post, Get, Middleware } from "@overnightjs/core"
import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import * as jwt_decode from "jwt-decode"
import { getConnection } from "typeorm"
import { secret } from "../keys/secret"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

import { Address } from "../entity/Address"
import { User } from "../entity/User"

const saltRounds = 10

@Controller("api/user")
export class UserController {

    @Get("getuseraddress/")
    @Middleware(jwtVerify)
    public async getUserAddress(req: any, res: Response): Promise<void> {
        const connection = getConnection()
        const decoded: any = jwt_decode(req.token)

        try {
            const address = await connection
                .getRepository(Address)
                .createQueryBuilder("address")
                .where("address.user = :user", { user: decoded.primaryKey })
                .orderBy("address.createdAt", "DESC")
                .getOne()

            res.status(200).json(address)
        } catch (error) {
            console.log(error)
        }
    }

    @Get("getuserphone/")
    @Middleware(jwtVerify)
    public async getUserPhone(req: any, res: Response): Promise<void> {
        const connection = getConnection()
        const decoded: any = jwt_decode(req.token)

        try {
            const phone = await connection
                .getRepository(User)
                .createQueryBuilder("user")
                .select("user.phone")
                .where("user.id = :user", { user: decoded.id })
                .getOne()

            res.status(200).json(phone)
        } catch (error) {
            console.log(error)
        }
    }

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
                        role: req.body.role,
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
                        phone: user.phone,
                        primaryKey: user.primaryKey,
                    }

                    const token = jwt.sign(payload, secret.secretOrKey, { expiresIn: 3600 * 24 })

                    res.json({ success: true, token: "Bearer " + token })
                } else {
                    res.status(400).json({ msg: "Invalid password or email" })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    @Post("createaddress/")
    @Middleware(jwtVerify)
    public async createAddress(req: any, res: Response): Promise<void> {
        const connection = getConnection()
        const decoded: any = jwt_decode(req.token)

        try {
            const user = await connection
                .getRepository(User)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: decoded.email })
                .getOne()

            const addressProps = {
                postalcode: req.body.postalcode,
                country: req.body.country,
                address: req.body.address,
                city: req.body.city,
                user,
            }

            const address = new Address()
            Object.assign(address, addressProps)

            await connection.manager.save(address)

            res.json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }

    @Post("updatephone/")
    @Middleware(jwtVerify)
    public async updatePhone(req: any, res: Response): Promise<void> {
        const connection = getConnection()
        const decoded: any = jwt_decode(req.token)

        try {
            await connection
                .createQueryBuilder()
                .update(User)
                .set({ phone: req.body.phone })
                .where("id = :id", { id: decoded.id })
                .execute()

            res.json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }
} 
