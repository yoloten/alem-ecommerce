import React, { useState, useEffect } from "react"
import { v4 } from "uuid"
import axios from "axios"

import { setInputWidth } from "../../utils/setInputWidth"
import Dropdown from "../UI/Dropdown"
import Button from "../UI/Button"
import Input from "../UI/Input"

export default function AdminNewAttributes({ macroConfig, windowWidth }: any) {
    const [attributes, setAttributes]: any = useState([])
    const [macros, setMacros]: any = useState([])
    const [err, setErr] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    useEffect(() => {
        const getMacros = async () => {
            const macrosFromServer = await axios.get("http://localhost:8000/api/product/allmacros")
            const atributesFromServer = await axios.get("http://localhost:8000/api/product/schema", { params: { table: "product" } })

            if (atributesFromServer.data && atributesFromServer.data.attributes.length > 0) {
                setAttributes(atributesFromServer.data.attributes)
            }
            setMacros(macrosFromServer.data)
        }

        getMacros()
    }, [macroConfig])

    useEffect(() => {
        setTimeout(() => {
            setSuccessMsg("")
        }, 3000)
    }, [successMsg])

    const changeAttributes = (e: any) => {
        const newAttributes = [...attributes]

        if (e.target.name === "label") {
            newAttributes[parseInt(e.target.id, 10)].label = e.target.value
            setAttributes([...newAttributes])
        }
        if (e.target.name === "name") {
            newAttributes[parseInt(e.target.id, 10)].name = e.target.value.toLowerCase().split(" ").join("_")
            setAttributes([...newAttributes])
        }
        if (e.target.name === "type") {
            const value = JSON.parse(e.target.value)

            newAttributes[parseInt(e.target.id, 10)].type = value.name
            setAttributes([...newAttributes])
        }
        if (e.target.name === "allowFilter") {
            newAttributes[parseInt(e.target.id, 10)].allowFilter = e.target.checked
            setAttributes([...newAttributes])
        }
    }

    const addAttribute = (e: any) => {
        e.preventDefault()

        setAttributes([...attributes, { label: "", name: "", type: "", allowFilter: false }])
    }

    const submit = async (e: any) => {
        e.preventDefault()
        const obj = { table: "product", attributes }

        if (attributes.length > 0) {
            const res = await axios.post("http://localhost:8000/api/product/createschema", obj)

            if (res.data.success) {
                setSuccessMsg("Success!")
            }
        } else {
            setErr("Please, add at least one attribute")
        }
    }

    return (
        <div className="attributes-new">
            <div className="attributes-new-title">Product Attributes</div>
            <div className="attributes-new-subtitle">
                On this page you can create new properties of your product and edit existed ones
            </div>
            <form action="submit" onSubmit={submit} className="admin-attribute-list">
                {attributes && attributes.length > 0 ?
                    attributes.map((val: any, index: number) => {
                        return (
                            <div key={`attribute-${index}`} className="attribute-item">
                                <Dropdown
                                    extraTypes={["String", "Number"]}
                                    onChange={changeAttributes}
                                    className="attribute-input"
                                    windowWidth={windowWidth}
                                    id={index.toString()}
                                    value={val.type}
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    macros={macros}
                                    border={false}
                                    width={setInputWidth(windowWidth)}
                                    height="40"
                                    name="type"
                                    placeholder="Type"
                                    required={true}
                                /> 
                                <Input
                                    onChange={changeAttributes}
                                    windowWidth={windowWidth}
                                    id={index.toString()}
                                    placeholder="Name"
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    border={false}
                                    width={setInputWidth(windowWidth)}
                                    height="31"
                                    type="text"
                                    name="name"
                                    value={val.name}
                                    required={true}
                                />
                                <Input
                                    onChange={changeAttributes}
                                    windowWidth={windowWidth}
                                    id={index.toString()}
                                    placeholder="Label"
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    border={false}
                                    width={setInputWidth(windowWidth)}
                                    height="31"
                                    name="label"
                                    type="text"
                                    value={val.label}
                                    required={true}
                                />
                                <div className="checkbox attribute-input-checkbox">
                                    <div >Allow Filter:</div>
                                    <input
                                        type="checkbox"
                                        name="allowFilter"
                                        id={index.toString()}
                                        onChange={changeAttributes}
                                        checked={val.allowFilter}
                                    />
                                </div>
                            </div>
                        )
                    })
                    : ""
                }
                {attributes && attributes.length > 0
                    ? <Button
                        borderColor="#eee"
                        border={true}
                        backgroundColor="transparent"
                        content="SAVE CHANGES"
                        width="140px"
                        fontSize="13px"
                        customStyleObject={{ marginTop: "20px" }}
                    />
                    : ""
                }
                <Button
                    borderColor="#eee"
                    border={true}
                    backgroundColor="transparent"
                    onClick={addAttribute}
                    content="ADD ATTRIBUTE"
                    width="140px"
                    fontSize="13px"
                    customStyleObject={{ marginTop: "60px", marginBottom: "10px" }}
                />
            </form>
            <div
                className="success-message"
                style={{
                    textAlign: "center",
                    marginTop: "10px",
                    color: "red",
                }}
            >
                {err}
            </div>
            <div className="success-message" style={{ color: "red" }}>{err}</div>
            <div className="success-message" style={{ color: "#5beb78" }}>{successMsg}</div>
        </div>
    )
}
