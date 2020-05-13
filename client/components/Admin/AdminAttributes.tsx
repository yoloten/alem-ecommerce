import React, { useState, useEffect } from "react"

import AdminNewAttributes from "./NewAttributes"
import AdminSidebar from "./AdminSidebar"
import AdminMacro from "./NewMacro"
import AdminNav from "./AdminNav"

export default function Admin() {
    const [macroConfig, setMacroConfig]: any = useState([])
    const [windowHeight, setWindowHeight] = useState(0)

    useEffect(() => {
        setWindowHeight(window.innerHeight)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions)

        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [])

    const updateDimensions = () => setWindowHeight(window.innerHeight)

    const changeMacro = (macroState: any) => setMacroConfig([...macroConfig, macroState])

    return (
        <div className="admin-attriubtes">
            <AdminNav />
            <div className="admin-attributes-main" style={{ height: (windowHeight - 60) + "px"}}>
                <AdminSidebar />
                <div className="admin-attributes-content">
                    <AdminNewAttributes macroConfig={macroConfig} />
                    <AdminMacro onMacroSubmit={changeMacro} />
                </div>
            </div>
        </div>
    )
}
