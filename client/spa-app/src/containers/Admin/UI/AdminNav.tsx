import { Link, useCurrentRoute } from "react-navi"
import React from "react"

export default function AdminNav(): JSX.Element {
    const route = useCurrentRoute()

    return (
        <div className="admin-nav">
            <Link className="logo" href="/">
                älem
            </Link>
            <div className="admin-links">
                <Link
                    style={{ fontWeight: route.url.pathname.slice(0, 14) === "/admin/product" ? 500 : 400 }}
                    className="admin-link"
                    href="/admin/product/list"
                >
                    Products
                </Link>
                <Link className="admin-link" href="/admin/adminorder">
                    Orders
                </Link>
                <Link className="admin-link" href="/admin/users">
                    Users
                </Link>
                <Link className="admin-link" href="/admin/settings">
                    Settings
                </Link>
            </div>
        </div>
    )
}
