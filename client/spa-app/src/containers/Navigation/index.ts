import { createBrowserNavigation } from "navi"
import { rootRoutes } from "./routes"

export const navigation = createBrowserNavigation({
    routes: rootRoutes,
})
