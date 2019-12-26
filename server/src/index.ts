import { createConnection, getConnectionOptions } from "typeorm"
import { Server } from "@overnightjs/core"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import "reflect-metadata"

import { CategoryController } from "./controller/CategoryController"
import { ProductController } from "./controller/ProductController"
import { BrandController } from "./controller/BrandController"
import { UserController } from "./controller/UserController"

export class App extends Server {

    constructor() {
        super(process.env.NODE_ENV === "development")
        this.config()
        this.setupControllers()
    }

    private config(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cors())
    }

    private setupControllers(): void {
        const categoryController = new CategoryController()
        const productController = new ProductController()
        const brandController = new BrandController()
        const userController = new UserController()

        super.addControllers(
            [
                userController,
                categoryController,
                brandController,
                productController,
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
