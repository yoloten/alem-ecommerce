import { mount, route, redirect, lazy } from "navi"
import { Router } from "react-navi"
import * as React from "react"

import Attributes from "../admin/product/Attributes"
import CreateCategory from "../admin/product/Category"
import Create from "../admin/product/Create"
import Edit from "../admin/product/Edit"
import List from "../admin/product/List"

export const rootRoutes = mount({
    "/admin": mount({
        "/product": lazy(() =>
            mount({
                "/list": route({
                    view: <List />,
                    title: "Products List",
                }),
                "/create": route({
                    view: <Create />,
                    title: "Create Product",
                }),
                "/attributes": route({
                    view: <Attributes />,
                    title: "Edit Attributes",
                }),
                "/category": route({
                    view: <CreateCategory />,
                    title: "Edit Category",
                }),
                "/edit": route({
                    view: <Edit />,
                    title: "Edit Product",
                }),
            }),
        ),
    }),
})
