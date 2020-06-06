import React, { useState, useEffect } from "react"

import AdminMainContent from "../UI/AdminMainContent"
import AdminMacro from "./NewMacro"
import AdminNewAttributes from "./NewAttributes"

export default function Attributes(): JSX.Element {
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
        <AdminMainContent>
            <div className="admin-attributes-content">
                <AdminNewAttributes windowWidth={windowWidth} macroConfig={macroConfig} />
                <AdminMacro windowWidth={windowWidth} onMacroSubmit={changeMacro} />
            </div>
        </AdminMainContent>
    )
}
