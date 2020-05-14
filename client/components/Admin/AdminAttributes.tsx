import React, { useState, useEffect } from "react"

import AdminNewAttributes from "./NewAttributes"
import AdminSidebar from "./AdminSidebar"
import AdminMacro from "./NewMacro"
import AdminNav from "./AdminNav"

export default function Admin() {
    const [macroConfig, setMacroConfig]: any = useState([])
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

    const changeMacro = (macroState: any) => setMacroConfig([...macroConfig, macroState])

    return (
        <div className="admin-attriubtes">
            <AdminNav />
            <div className="admin-attributes-main" style={{ minHeight: (windowHeight - 60) + "px"}}>
                <AdminSidebar />
                <div className="admin-attributes-content">
                    <AdminNewAttributes windowWidth={windowWidth} macroConfig={macroConfig} />
                    <AdminMacro windowWidth={windowWidth} onMacroSubmit={changeMacro} />
                </div>
            </div>
        </div>
    )
}
