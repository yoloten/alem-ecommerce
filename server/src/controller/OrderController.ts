import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core"
import { jwtVerify } from "../utils/jwtVerify"
import { Request, Response } from "express"
import * as jwt_decode from "jwt-decode"
import { getConnection } from "typeorm"

import { Order } from "../entity/Order"
import { User } from "../entity/User"
import { Address } from "../entity/Address"
import { CartItem } from "../entity/CartItem"
import { OrderDetails } from "../entity/OrderDetails"
import { Status } from "../entity/Status"

@Controller("api/order")
export class OrderController {

    @Get("orderdetails/")
    @Middleware(jwtVerify)
    public async getOrderDetails(req: Request, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const details = await connection.getRepository(OrderDetails).findOne({id: req.query.id})

            res.json(details)
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
            const { id } = req.body

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

            const orderDetails = await connection
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

            res.json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }

    @Post("createcart/")
    // @Middleware(jwtVerify)
    public async createCart(req: any, res: Response): Promise<void> {
        const connection = getConnection()

        try {
            const { id, cartItems } = req.body

            // console.log(id, cartItems)

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

                await getConnection()
                    .createQueryBuilder()
                    .update(CartItem)
                    .set({
                        price: discount !== 1 ? (price - price * discount) : price,
                        quantity: parseInt(cartItems[i].quantity, 10),
                        currency: cartItems[i].currency,
                        color: cartItems[i].color,
                        size: cartItems[i].size,
                    })
                    .where("id = :id", { id: item.id })
                    .execute()

                totalPrice.push(discount !== 1 ? (price - price * discount) : price)
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

            totalPrice.push(itemProps.price)
            currency = cartItems[i].currency
        }
    }

    return {
        totalPrice: totalPrice.reduce((acc, curr) => acc + curr),
        currency,
    }
}
