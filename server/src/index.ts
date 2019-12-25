import { Server } from "@overnightjs/core"
import * as bodyParser from "body-parser"
import {createConnection, getConnectionOptions} from "typeorm"
import "reflect-metadata"
import * as cors from "cors"

import { UserController } from "./controller/UserController"
import { CategoryController } from "./controller/CategoryController"

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
        const userController = new UserController()
        const categoryController = new CategoryController()

        super.addControllers([userController, categoryController])
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
