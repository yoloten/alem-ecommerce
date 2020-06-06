import { Link, useCurrentRoute } from "react-navi"
import React, { useState } from "react"

import * as Icons from "../../../../../common-components/icons"

export default function AdminSidebar(): JSX.Element {
    const route = useCurrentRoute()

    const showLinks = (): JSX.Element => {
        const path = route.url.pathname

        if (path.slice(0, 14) === "/admin/product") {
            return (
                <>
                    <Link
                        activeStyle={{ borderLeft: "5px solid black" }}
                        className="admin-sidebar-item sidebar-item-first"
                        href="/admin/product/list"
                    >
                        <div className="sidebar-icon">
                            <Icons.List />
                        </div>
                        <div>Product List</div>
                    </Link>

                    <Link
                        activeStyle={{ borderLeft: "6px solid black" }}
                        className="admin-sidebar-item"
                        href="/admin/product/attributes"
                    >
                        <div className="sidebar-icon">ico</div>
                        <div>Edit Attributes</div>
                    </Link>

                    <Link
                        activeStyle={{ borderLeft: "5px solid black" }}
                        className="admin-sidebar-item"
                        href="/admin/product/create"
                    >
                        <div className="sidebar-icon">ico</div>
                        <div>Create product</div>
                    </Link>

                    <Link
                        activeStyle={{ borderLeft: "5px solid black" }}
                        className="admin-sidebar-item"
                        href="/admin/product/category"
                    >
                        <div className="sidebar-icon">ico</div>
                        <div>Create category</div>
                    </Link>
                </>
            )
        }
        return <></>
    }

    return <div className="admin-sidebar">{showLinks()}</div>
}
