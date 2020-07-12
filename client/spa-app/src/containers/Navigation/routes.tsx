import { logout, setUserFromCookie } from "reducers/user/userReducer"
import { mount, route, redirect, lazy, Matcher } from "navi"
import { setAuthToken, Decoded } from "actions/user/auth"
import jwt_decode from "jwt-decode"
import { Router } from "react-navi"
import cookie from "js-cookie"
import * as React from "react"
import store from "store"

import Attributes from "../Admin/Product/Attributes"
import CreateCategory from "../Admin/Product/Category"
import Address from "containers/User/Address"
import Create from "../Admin/Product/Create"
import Edit from "../Admin/Product/Edit"
import List from "../Admin/Product/List"
import Register from "../Auth/Register"
import Login from "../Auth/Login"
import Order from "../User/Order"
import Cart from "../User/Cart"

interface returningInterface {
    adminPath: Matcher<any, any>
    customerPath: Matcher<any, any>
    loggedIn: Matcher<any, any>
}

if (cookie.get("token")) {
    const token: any = cookie.get("token")
    const decoded: Decoded = jwt_decode(token)
    const currentTime = Date.now() / 1000

    setAuthToken(token)
    store.dispatch(setUserFromCookie(decoded))

    if (decoded.exp < currentTime) {
        store.dispatch(logout())
        redirect("/login")
        console.log("Expired")
    }
}

export const redirectIfAuth = (route: Matcher<any, any>): returningInterface => {
    const { user } = store && store.getState()
    const userRole = user.user.role
    const isAuth = user.isLoggedIn
    const returningObject: returningInterface = {
        adminPath: redirect("/"),
        customerPath: redirect("/"),
        loggedIn: redirect("/"),
    }

    if (isAuth && userRole) {
        if (userRole === "admin" || userRole === "superadmin") {
            returningObject.adminPath = route
        }
        if (userRole === "customer") {
            returningObject.customerPath = route
        }
    } else {
        returningObject.loggedIn = route
    }

    return returningObject
}

export const rootRoutes = mount({
    "/admin": mount({
        "/product": lazy(() =>
            mount({
                "/list": redirectIfAuth(
                    route({
                        view: <List />,
                        title: "Products List",
                    }),
                ).adminPath,
                "/create": redirectIfAuth(
                    route({
                        view: <Create />,
                        title: "Create Product",
                    }),
                ).adminPath,
                "/attributes": redirectIfAuth(
                    route({
                        view: <Attributes />,
                        title: "Edit Attributes",
                    }),
                ).adminPath,
                "/category": redirectIfAuth(
                    route({
                        view: <CreateCategory />,
                        title: "Edit Category",
                    }),
                ).adminPath,
                "/edit": redirectIfAuth(
                    route({
                        view: <Edit />,
                        title: "Edit Product",
                    }),
                ).adminPath,
            }),
        ),
    }),
    "/auth": lazy(() =>
        mount({
            "/register": redirectIfAuth(
                route({
                    view: <Register />,
                    title: "Register",
                }),
            ).loggedIn,

            "/login": redirectIfAuth(
                route({
                    view: <Login />,
                    title: "Login",
                }),
            ).loggedIn,
        }),
    ),
    "/user": lazy(() =>
        mount({
            "/cart": route({
                view: <Cart />,
                title: "Cart",
            }),
            "/address": redirectIfAuth(
                route({
                    view: <Address />,
                    title: "Address",
                }),
            ).customerPath,
            "/order": redirectIfAuth(
                route({
                    view: <Order />,
                    title: "Order",
                }),
            ).customerPath,
        }),
    ),
})
