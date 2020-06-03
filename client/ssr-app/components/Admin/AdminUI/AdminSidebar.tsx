import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import * as Icons from "../../../public/icons/_compiled"

export default function AdminSidebar() {
    const [state, setState] = useState("")
    const router = useRouter()

    const showLinks = () => {
        const path = router.pathname

        if (path === "/admin/attributes" 
        || path === "/admin/createproduct" 
        || path === "/admin/createcategory" 
        || path === "/admin/productslist"
        || path === "/admin/editproduct"
        ) {
            return (
                <>
                    <div className="admin-sidebar-item sidebar-item-first">
                        <div className="sidebar-icon"><Icons.List /></div>
                        <Link href="/admin/productslist">
                            <a className="admin-sidebar-link">Product List</a>
                        </Link>
                    </div>
                    <div className="admin-sidebar-item">
                        <div className="sidebar-icon">ico</div>
                        <Link href="/admin/attributes">
                            <a className="admin-sidebar-link">Edit Attributes</a>
                        </Link>
                    </div>
                    <div className="admin-sidebar-item">
                        <div className="sidebar-icon">ico</div>
                        <Link href="/admin/createproduct">
                            <a className="admin-sidebar-link">Create product</a>
                        </Link>
                    </div>
                    <div className="admin-sidebar-item">
                        <div className="sidebar-icon">ico</div>
                        <Link href="/admin/createcategory">
                            <a className="admin-sidebar-link">Create category</a>
                        </Link>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="admin-sidebar">
            {showLinks()}
        </div>
    )
}
