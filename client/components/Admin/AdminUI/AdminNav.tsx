import React from "react"
import Link from "next/link"

export default function AdminNav() {
    return (
        <div className="admin-nav">
            <Link href="/">
                <a className="logo">älem</a>
            </Link>
            <div className="admin-links">
                <Link href="/admin/createproduct">
                    <a className="admin-link">Products</a>
                </Link>
                <Link href="/admin/adminorder">
                    <a className="admin-link">Orders</a>
                </Link>
                <Link href="/admin/users">
                    <a className="admin-link">Users</a>
                </Link>
                <Link href="/admin/settings">
                    <a className="admin-link">Settings</a>
                </Link>
            </div>
        </div>
    )
}
