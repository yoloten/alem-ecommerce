import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import * as jwt_decode from "jwt-decode"
import { getConnection } from "typeorm"
import * as currency from "currency.js"
import * as multer from "multer"
import * as sharp from "sharp"
import { v4 } from "uuid"

import { Delivery } from "../entity/Delivery"
import { Address } from "../entity/Address"
import { Status } from "../entity/Status"
import { Order } from "../entity/Order"
import { User } from "../entity/User"

const storage = multer.memoryStorage()
const multerFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb("Please upload only images.", false)
    }
}
const upload = multer({ storage, fileFilter: multerFilter })

@Controller("api/order")
export class OrderController {
    @Get("getorderdetails/")
    @Middleware(jwtVerify)
    public async getOrderDetails(req: any, res: Response): Promise<void> {
        const connection = getConnection()
        const decoded: any = jwt_decode(req.token)

        try {
            const user: any = await connection
                .getRepository(User)
                .createQueryBuilder("user")
                .select(["user.primaryKey", "user.orderDetailsId"])
                .leftJoinAndMapOne("user.address", "user.addresses", "address", "address.selected = TRUE")
                .where("user.primaryKey = :user", { user: decoded.primaryKey })
                .getOne()

            const orderDetails = await connection.query(`
                SELECT * 
                FROM order_details
                WHERE order_details.id = ${user?.orderDetailsId}
            `)

            const cartItems = await connection.query(
                `SELECT * FROM cart_item WHERE order_details_id = ${orderDetails[0].id}`,
            )

            orderDetails[0].cart = cartItems
            orderDetails[0].address = user.address

            res.json(orderDetails[0])
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("alldelivery/")
    @Middleware(jwtVerify)
    public async allDelivery(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const delivery = await connection.getRepository(Delivery).find({
                order: {
                    price: "ASC",
                },
                take: 6,
            })

            res.json(delivery)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Get("onedelivery/")
    @Middleware(jwtVerify)
    public async oneDelivery(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const delivery = await connection
                .getRepository(Delivery)
                .findOne({ primaryKey: parseInt(req.query.primaryKey, 10) })

            res.json(delivery)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    @Post("create/")
    @Middleware(jwtVerify)
    public async create(req: any, res: Response): Promise<void> {
        const connection = getConnection()
        const decoded: any = jwt_decode(req.token)

        try {
            const { orderDetails, card } = req.body
            console.log(req.body)
            // const user: any = await connection
            //     .getRepository(User)
            //     .createQueryBuilder("user")
            //     .where("user.email = :email", { email: decoded.email })
            //     .getOne()

            // const address = await connection
            //     .getRepository(Address)
            //     .createQueryBuilder("address")
            //     .where("address.user = :user", { user: user.primaryKey })
            //     .orderBy("address.createdAt", "DESC")
            //     .getOne()

            // const orderDetails: any = await connection
            //     .getRepository(OrderDetails)
            //     .createQueryBuilder("details")
            //     .where("details.id = :id", { id })
            //     .getOne()

            // const statusProps = {
            //     status: "New Order",
            //     comment: "Your order has been created successfully",
            // }

            // const status = new Status()
            // Object.assign(status, statusProps)

            // await connection.manager.save(status)

            // const orderProps = {
            //     orderDetails,
            //     address,
            //     status,
            //     user,
            // }

            // const order = new Order()
            // Object.assign(order, orderProps)

            // await connection.manager.save(order)

            // const stripe = new Stripe("sk_test_tbRPOqykVPe6Fol8VTrJyZum00pdbo5Dzr", {
            //     apiVersion: "2019-12-03",
            //     typescript: true,
            // })
            // const params: Stripe.ChargeCreateParams = {
            //     amount: parseFloat(orderDetails.totalPrice) * 100,
            //     currency: orderDetails?.currency.toLowerCase(),
            //     receipt_email: decoded.email,
            //     source,
            // }

            // const charge: Stripe.Charge = await stripe.charges.create(params)

            res.json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }

    @Post("createcart/")
    @Middleware(jwtVerify)
    public async createCart(req: any, res: Response): Promise<void> {
        const connection = getConnection()
        const decoded: any = jwt_decode(req.token)

        try {
            const { id, cartItems } = req.body
            let totalPrice = currency(0)
            const enums: string[] = []
            let itemCurrency = ""

            await connection.query(`
                    CREATE TABLE IF NOT EXISTS order_details (
                        id SERIAL PRIMARY KEY,
                        uuid VARCHAR NOT NULL,
                        total_price NUMERIC NOT NULL,
                        currency VARCHAR NOT NULL
                    );
                `)

            const existedTable = await connection.query(`
                SELECT EXISTS (
                    SELECT FROM pg_tables
                    WHERE  schemaname = 'public'
                    AND    tablename  = 'cart_item'
                    );
            `)

            if (cartItems.length > 0) {
                for (let i = 0; i < cartItems.length; i++) {
                    const priceObj = { price: 0, discount: 0 }

                    Object.keys(cartItems[i]).map(async (key) => {
                        if (key === "price") {
                            priceObj.price = parseFloat(cartItems[i][key])
                        }
                        if (key === "discount") {
                            priceObj.discount = parseFloat(cartItems[i][key])
                        }
                        if (key === "currency") {
                            itemCurrency = cartItems[i][key]
                        }

                        if (key.slice(-5) === "_enum") {
                            if (existedTable[0].exists) {
                                const existedColumn = await connection.query(`
                                    SELECT column_name 
                                    FROM information_schema.columns 
                                    WHERE table_name='cart_item' and column_name='${key}';
                                `)

                                if (existedColumn.length === 0) {
                                    await connection.query(`
                                        ALTER TABLE cart_item
                                        ADD COLUMN ${key} VARCHAR;
                                    `)
                                }
                            } else {
                                enums.push(`${key} VARCHAR`)
                            }
                        }
                    })

                    totalPrice = totalPrice.add(priceObj.price - priceObj.price * priceObj.discount)
                }
            }

            const uniqueEnums = Array.from(new Set(enums))

            if (!existedTable[0].exists) {
                await connection.query(`
                    CREATE TABLE cart_item (
                        id SERIAL PRIMARY KEY,
                        key VARCHAR NOT NULL,
                        currency VARCHAR NOT NULL,
                        price NUMERIC NOT NULL,
                        discount NUMERIC NOT NULL,
                        product_id INT NOT NULL,
                        order_details_id INT NOT NULL,
                        quantity INT NOT NULL,
                        FOREIGN KEY (order_details_id) REFERENCES order_details(id) ON DELETE CASCADE,
                        ${uniqueEnums.join(", ")}
                    );
                `)
            }

            const existedOrderDetails = await connection.query(`SELECT id FROM order_details WHERE uuid='${id}'`)
            let detailsID = existedOrderDetails.length > 0 ? existedOrderDetails[0].id : null

            if (existedOrderDetails.length === 0) {
                const orderDetailsID = await connection.query(
                    `
                    INSERT INTO order_details(total_price, currency, uuid)
                    VALUES 
                        ($1, $2, $3)
                    Returning id;
                `,
                    [totalPrice.value, itemCurrency, id],
                )

                detailsID = orderDetailsID[0].id
            }

            for (let i = 0; i < cartItems.length; i++) {
                const names: string[] = []
                const values: string[] = []

                Object.keys(cartItems[i]).map((key) => {
                    if (key !== "photo" && key !== "name") {
                        names.push(key)

                        if (typeof cartItems[i][key] === "string") {
                            values.push(`'${cartItems[i][key]}'`)
                        } else {
                            values.push(cartItems[i][key])
                        }
                    }
                })

                const existedCartItem = await connection.query(
                    `SELECT id FROM cart_item WHERE key='${cartItems[i].key}'`,
                )

                if (existedCartItem.length === 0) {
                    await connection.query(`
                        INSERT INTO cart_item(${names.join(", ")}, order_details_id)
                        VALUES 
                            (${values.join(", ")}, ${detailsID});
                    `)
                }
            }

            const user: any = await connection.getRepository(User).findOne({ primaryKey: decoded.primaryKey })
            user.orderDetailsId = detailsID

            await connection.manager.save(user)

            res.json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }

    @Post("createdelivery/")
    // @Middleware(upload.single("photo"))
    // @Middleware(jwtVerify)
    public async createDelivery(req: any, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { value, label, price, currency, meta } = req.body
            const deliveryProps = { value, label, price, currency, meta }
            const delivery = new Delivery()

            Object.assign(delivery, deliveryProps)
            await connection.manager.save(delivery)

            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }

    @Put("update/")
    public async update(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            res.status(200).json({ success: true })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
