import { createConnection, getConnectionOptions } from "typeorm"
import { Server } from "@overnightjs/core"
import * as bodyParser from "body-parser"
import * as express from "express"
import * as cors from "cors"
import "reflect-metadata"

import { CategoryController } from "./controller/CategoryController"
import { ProductController } from "./controller/ProductController"
import { OrderController } from "./controller/OrderController"
import { UserController } from "./controller/UserController"

export class App extends Server {

    constructor() {
        super(process.env.NODE_ENV === "development")
        this.config()
        this.setupControllers()
    }

    private config(): void {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(cors())
        this.app.use("/public", express.static("public"))
    }

    private setupControllers(): void {
        const categoryController = new CategoryController()
        const productController = new ProductController()
        const orderController = new OrderController()
        const userController = new UserController()

        super.addControllers(
            [
                categoryController,
                productController,
                orderController,
                userController,
            ])
    }

    public async start(port: number) {
        try {
            const connection = await createConnection()

            this.app.set("dbConnection", connection)

            this.app.listen(port, () => console.log("Server listening on port: " + port))
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    }
}

const app = new App()
app.start(8000)
