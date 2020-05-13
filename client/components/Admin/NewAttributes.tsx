import React, { useState, useEffect } from "react"
import axios from "axios"

export default function AdminNewAttributes({ macroConfig }: any) {
    const [attributes, setAttributes]: any = useState([])
    const [name, setName]: any = useState("")
    const [macros, setMacros]: any = useState([])

    useEffect(() => {
        const getMacros = async () => {
            const macrosFromServer = await axios.get("http://localhost:8000/api/product/allmacros")

            setMacros(macrosFromServer.data)

        }

        getMacros()
    }, [macroConfig])
    console.log(macroConfig)
    const changeName = (e: any) => setName(e.target.value)

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
        }
        if (e.target.name === "allowFilter") {
            newAttributes[parseInt(e.target.id, 10)].allowFilter = e.target.checked
            setAttributes([...newAttributes])
        }
    }

    const addAttribute = () => setAttributes([...attributes, { label: "", name: "", type: "", allowFilter: false }])

    const submit = async () => {
        const obj = {
            table: "product_" + name.toLowerCase(),
            attributes,
        }

        if (attributes.length > 0) {
            await axios.post("http://localhost:8000/api/product/createschema", obj)

            localStorage.setItem(obj.table, JSON.stringify(obj))
        }
    }

    return (
        <div className="adminpanel">
            <input type="text" placeholder="Product Name" onChange={changeName} />
            <h3>New attribute</h3>
            <button className="validator-btn" onClick={addAttribute}>+Add attribute</button>
            {
                attributes.map((val: any, index: number) => {
                    return (
                        <div key={`attribute-${index}`} className="attribute">
                            <h3>Attribute {index + 1}</h3>
                            <input
                                id={index.toString()}
                                type="text"
                                name="label"
                                placeholder="Label"
                                onChange={changeAttributes}
                            />
                            <input
                                type="text"
                                name="name"
                                id={index.toString()}
                                placeholder="Name"
                                onChange={changeAttributes}
                            />
                            <select
                                name="type"
                                id={index.toString()}
                                onChange={changeAttributes}
                            >
                                <option value="" disabled selected>Type</option>
                                {macros.length > 0
                                    ? macros.map((value: any, i: number) => {
                                        return (
                                            <option value={JSON.stringify(value)}>{value.name}</option>
                                        )
                                    })
                                    : ""
                                }
                                <option value={JSON.stringify({ name: "String" })}>String</option>
                            </select>
                            <div className="checkbox">
                                <div>Allow Filter:</div>
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
            <button onClick={submit}>Submit</button>
        </div>
    )
}
