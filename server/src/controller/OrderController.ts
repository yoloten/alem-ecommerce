import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import * as jwt_decode from "jwt-decode"
import { getConnection } from "typeorm"
import * as multer from "multer"
import * as sharp from "sharp"
import Stripe from "stripe"
import { v4 } from "uuid"

import { OrderDetails } from "../entity/OrderDetails"
import { CartItem } from "../entity/CartItem"
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

    @Get("orderdetails/")
    @Middleware(jwtVerify)
    public async getOrderDetails(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const details = await connection.getRepository(OrderDetails).findOne({ id: req.query.id })

            res.json(details)
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
            const { id, source } = req.body

            const user: any = await connection
                .getRepository(User)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: decoded.email })
                .getOne()

            const address = await connection
                .getRepository(Address)
                .createQueryBuilder("address")
                .where("address.user = :user", { user: user.primaryKey })
                .orderBy("address.createdAt", "DESC")
                .getOne()

            const orderDetails: any = await connection
                .getRepository(OrderDetails)
                .createQueryBuilder("details")
                .where("details.id = :id", { id })
                .getOne()
            
            const statusProps = {
                status: "New Order",
                comment: "Your order has been created successfully",
            }
         
            const status = new Status()
            Object.assign(status, statusProps)

            await connection.manager.save(status)

            const orderProps = {
                orderDetails,
                address,
                status,
                user,
            }

            const order = new Order()
            Object.assign(order, orderProps)
            
            await connection.manager.save(order)
           
            const stripe = new Stripe("sk_test_tbRPOqykVPe6Fol8VTrJyZum00pdbo5Dzr", {
                apiVersion: "2019-12-03",
                typescript: true,
            })
            const params: Stripe.ChargeCreateParams = {
                amount: parseFloat(orderDetails.totalPrice) * 100,
                currency: orderDetails?.currency.toLowerCase(),
                receipt_email: decoded.email,
                source,
            }

            const charge: Stripe.Charge = await stripe.charges.create(params)

            res.json(charge.id)

        } catch (error) {
            console.log(error)
        }
    }

    @Post("createcart/")
    @Middleware(jwtVerify)
    public async createCart(req: any, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { id, cartItems } = req.body
            const details = await connection.getRepository(OrderDetails).findOne({ id })

            if (details) {
                const totalAndCurrency: any = await createNewItems(connection, cartItems, details, res)
                if (totalAndCurrency) {
                    await getConnection()
                        .createQueryBuilder()
                        .update(OrderDetails)
                        .set({
                            totalPrice: totalAndCurrency.totalPrice,
                            currency: totalAndCurrency.currency,
                        })
                        .where("id = :id", { id })
                        .execute()

                    res.json({ success: true })
                }
            } else {
                const orderDetails = new OrderDetails()

                Object.assign(orderDetails, { id })
                await connection.manager.save(orderDetails)

                const totalAndCurrency: any = await createNewItems(connection, cartItems, orderDetails, res)

                if (totalAndCurrency) {
                    await getConnection()
                        .createQueryBuilder()
                        .update(OrderDetails)
                        .set({
                            totalPrice: totalAndCurrency.totalPrice,
                            currency: totalAndCurrency.currency,
                        })
                        .where("id = :id", { id })
                        .execute()

                    res.json({ success: true })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    @Post("createdelivery/")
    @Middleware(upload.single("photo"))
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

const createNewItems = async (connection: any, cartItems: any, details: any, res: Response) => {
    const totalPrice = []
    let currency = ""

    for (let i = 0; i < cartItems.length; i++) {
        const item: any = await connection
            .getRepository(CartItem)
            .createQueryBuilder("item")
            .where("item.id = :id", { id: cartItems[i].key })
            .getOne()

        if (item) {
            if (cartItems[i].key === item.id) {
                const price = parseFloat(cartItems[i].price)
                const discount = parseFloat(cartItems[i].discount)
                const quantity = parseInt(cartItems[i].quantity, 10)

                await getConnection()
                    .createQueryBuilder()
                    .update(CartItem)
                    .set({
                        price: discount !== 1 ? (price - price * discount) : price,
                        quantity,
                        currency: cartItems[i].currency,
                        color: cartItems[i].color,
                        size: cartItems[i].size,
                    })
                    .where("id = :id", { id: cartItems[i].key })
                    .execute()

                totalPrice.push(discount !== 1 ? ((price - price * discount) * quantity) : price * quantity)
                currency = cartItems[i].currency
            }
        } else {
            const price = parseFloat(cartItems[i].price)
            const discount = parseFloat(cartItems[i].discount)

            const itemProps = {
                price: discount !== 1 ? (price - price * discount) : price,
                quantity: parseInt(cartItems[i].quantity, 10),
                productPrimaryKey: cartItems[i].primaryKey,
                currency: cartItems[i].currency,
                color: cartItems[i].color,
                size: cartItems[i].size,
                orderDetails: details,
                id: cartItems[i].key,
            }

            const newItem = new CartItem()

            Object.assign(newItem, itemProps)
            await connection.manager.save(newItem)

            totalPrice.push(itemProps.price * itemProps.quantity)
            currency = cartItems[i].currency
        }
    }

    return {
        totalPrice: totalPrice.reduce((acc, curr) => acc + curr),
        currency,
    }
}
