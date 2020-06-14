import { Controller, Post, Get, Middleware } from "@overnightjs/core"
import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import * as jwt_decode from "jwt-decode"
import { getConnection } from "typeorm"
import { secret } from "../keys/secret"
import * as jwt from "jsonwebtoken"
import validator from "validator"
import * as bcrypt from "bcrypt"
import * as multer from "multer"
import * as sharp from "sharp"
import * as path from "path"
import { v4 } from "uuid"
import * as fs from "fs"

import { Address } from "../entity/Address"
import { User } from "../entity/User"

const saltRounds = 10

const storage = multer.memoryStorage()

const multerFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb("Please upload only images.", false)
    }
}

const upload = multer({ storage, fileFilter: multerFilter })

interface UserInterface {
    password: string
    email: string
    name: string
}

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
    @Middleware(upload.single("photo"))
    public async register(req: Request, res: Response): Promise<void> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()

        try {
            const { fields } = req.body
            const { email, name, password }: UserInterface = JSON.parse(fields)
            const photo = req.file
            
            if (typeof email !== "string" || !validator.isEmail(email)) {
                res.status(400).json({ success: "Not email" })
            }

            else if (typeof name !== "string" || !name) {
                res.status(400).json({ success: "No name provided" })
            }

            else if (typeof name !== "string" || password.length < 6) {
                res.status(400).json({ success: "Minimum password length is 6 characters" })
            } else {
                const user = await connection
                .getRepository(User)
                .createQueryBuilder("user")
                .where("user.email = :email", { email })
                .getOne()

                if (user) {
                    res.status(400).json({ success: "This email already exists" })
                } else {
                    const hash = await bcrypt.hash(password, saltRounds)
                    const hashedPassword = hash
                    const generatedName = "user_avatar_" + v4() + ".jpeg"
                    
                    await sharp(photo.buffer)
                        .resize(900)
                        .toFormat("jpeg")
                        .jpeg({ quality: 75 })
                        .toFile(`public/${generatedName}`)

                    const photoObj = {
                        path: `public/${generatedName}`,
                        filename: generatedName,
                        extension: "jpeg",
                    }

                    const userProps = {
                        photo: JSON.stringify(photoObj),
                        password: hashedPassword,
                        email,
                        name,
                    }
    
                    const newUser = new User()
                    Object.assign(newUser, userProps)

                    await connection.manager.save(newUser)
        
                    res.status(200).json({ success: "Success" })
                }
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
                res.status(400).json({ msg: "User not found" })
            } else {
                const isMatch = await bcrypt.compare(req.body.password, user.password)

                if (isMatch) {
                    const payload = {
                        name: user.name,
                        id: user.id,
                        email: user.email,
                        phone: user.phone,
                        primaryKey: user.primaryKey,
                        photo: user.photo,
                        role: user.role
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
