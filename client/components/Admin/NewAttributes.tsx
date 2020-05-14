import React, { useState, useEffect } from "react"
import axios from "axios"

import Dropdown from "../UI/Dropdown"
import Button from "../UI/Button"
import Input from "../UI/Input"

export default function AdminNewAttributes({ macroConfig, windowWidth }: any) {
    const [attributes, setAttributes]: any = useState([])
    const [macros, setMacros]: any = useState([])
    const [dropdownValue, setValue]: any = useState("")

    useEffect(() => {
        const getMacros = async () => {
            const macrosFromServer = await axios.get("http://localhost:8000/api/product/allmacros")

            setMacros(macrosFromServer.data)

        }

        getMacros()
    }, [macroConfig])

    const changeAttributes = (e: any) => {
        const newAttributes = [...attributes]

        if (e.target.name === "label") {
            newAttributes[parseInt(e.target.id, 10)].label = e.target.value
            setAttributes([...newAttributes])
        }
        if (e.target.name === "name") {
            newAttributes[parseInt(e.target.id, 10)].name = e.target.value
            setAttributes([...newAttributes])
        }
        if (e.target.name === "type") {
            const value = JSON.parse(e.target.value)

            newAttributes[parseInt(e.target.id, 10)].type = value.name
            setAttributes([...newAttributes])
            setValue(value.name)
        }
        if (e.target.name === "allowFilter") {
            newAttributes[parseInt(e.target.id, 10)].allowFilter = e.target.checked
            setAttributes([...newAttributes])
        }
    }

    const addAttribute = () => setAttributes([...attributes, { label: "", name: "", type: "", allowFilter: false }])

    const submit = async () => {
        const obj = {
            table: "product",
            attributes,
        }

        if (attributes.length > 0) {
            await axios.post("http://localhost:8000/api/product/createschema", obj)

            localStorage.setItem(obj.table, JSON.stringify(obj))
        }
    }

    const setInputWidth = () => {
        if (windowWidth > 1800) {
            return "180"
        }
        if (windowWidth > 1700) {
            return "170"
        }
        if (windowWidth < 1500) {
            return "100"
        }

        if (windowWidth < 1650) {
            return "140"
        }
    }

    return (
        <div className="attributes-new">
            <div className="attributes-new-title">Product Attributes</div>
            <div className="attributes-new-subtitle">
                On this page you can create new properties of your product and edit existed ones
            </div>
            <div className="admin-attribute-list">
                {
                    attributes.map((val: any, index: number) => {
                        return (
                            <div key={`attribute-${index}`} className="attribute-item">
                                <Dropdown
                                    extraTypes={["String", "Number"]}
                                    onChange={changeAttributes}
                                    className="attribute-input"
                                    windowWidth={windowWidth}
                                    id={index.toString()}
                                    value={dropdownValue}
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    macros={macros}
                                    border={false}
                                    width={setInputWidth()}
                                    height="40"
                                    name="type"
                                    placeholder={true}
                                />
                                <Input
                                    className="attribute-input"
                                    onChange={changeAttributes}
                                    windowWidth={windowWidth}
                                    id={index.toString()}
                                    placeholder="Name"
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    border={false}
                                    width={setInputWidth()}
                                    height="31"
                                    type="text"
                                    name="name"
                                />
                                <Input
                                    className="attribute-input"
                                    onChange={changeAttributes}
                                    windowWidth={windowWidth}
                                    id={index.toString()}
                                    placeholder="Label"
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    border={false}
                                    width={setInputWidth()}
                                    height="31"
                                    name="label"
                                    type="text"
                                />
                                <div className="checkbox attribute-input-checkbox">
                                    <div >Allow Filter:</div>
                                    <input
                                        type="checkbox"
                                        name="allowFilter"
                                        id={index.toString()}
                                        onChange={changeAttributes}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                <Button
                    borderColor="#eee"
                    border={true}
                    backgroundColor="transparent"
                    onClick={addAttribute}
                    content="ADD ATTRIBUTE"
                    width="140px"
                    fontSize="13px"
                    customStyleObject={{marginTop: "60px", marginBottom: "10px"}}
                />
            </div>
            {/* <button onClick={submit}>Submit</button> */}
        </div>
    )
}
