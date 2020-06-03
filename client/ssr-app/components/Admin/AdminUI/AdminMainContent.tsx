import React, { useEffect, useState } from "react"

import AdminSidebar from "./AdminSidebar"
import AdminNav from "./AdminNav"

export default function AdminMainContent(props: any) {
    const [windowHeight, setWindowHeight] = useState(0)
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowHeight(window.innerHeight)
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions)

        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [])

    const updateDimensions = () => {
        setWindowHeight(window.innerHeight)
        setWindowWidth(window.innerWidth)
    }

    return (
        <div>
            <AdminNav />
            <div className="admin-main" style={{ minHeight: (windowHeight - 60) + "px" }}>
                <AdminSidebar />
                <div className="admin-content">
                    {Array.isArray(props.children) ? props.children.map((child: any) => child) : props.children}
                </div>
            </div>
        </div>
    )
}
