import React, { useEffect, useState } from "react"
import axios from "axios"

import Input from "./AdminInput"

export default function CreateProduct() {
    const [attributes, setAttributes]: any = useState([])
    const [tableNames, setTableNames]: any = useState([])
    const [table, setTableName]: any = useState("")
    const [fields, setFields]: any = useState([])
    const [errors, setErrors]: any = useState([])
    const [disabledBtn, setDisabledBtn]: any = useState(true)

    useEffect(() => {
        setTableNames(Object.keys(localStorage).filter(item => item.slice(0, 7) === "product"))
    }, [])

    useEffect(() => {
        const getSchema = async () => {
            const newSchema = await axios.get("http://localhost:8000/api/product/schema", { params: { table } })

            if (newSchema.data) {
                setAttributes(JSON.parse(newSchema.data.schema))

                let arr = []
                let errArr = []

                for (let i = 0; i < JSON.parse(newSchema.data.schema).length; i++) {
                    arr.push({})
                    errArr.push("")
                }

                setFields(arr)
                setErrors(errArr)
            }
        }

        getSchema()
    }, [table])

    const changeName = (e: any) => setTableName(e.target.value)

    const onChangeInputField = (field: any, err: any, type: any) => {
        const newFields = [...fields]
        const newErrors = [...errors]
        const { value, id, name, attributeType } = field

        if (type === "enum") {
            const arr = [...[newFields[parseInt(id, 10)][name]]]

            arr.push(value)

            newFields[parseInt(id, 10)][name] = arr.flat().filter((a: any) => {
                return a != null || a != undefined
            })
            newFields[parseInt(id, 10)].type = attributeType
        } else {
            newFields[parseInt(id, 10)][name] = value
            newFields[parseInt(id, 10)].type = attributeType
        }

        newErrors[parseInt(id, 10)] = err

        setFields([...newFields])
        setErrors([...newErrors])

        if (newErrors.filter((e) => e !== "")[0]) {
            setDisabledBtn(true)
        } else {
            setDisabledBtn(false)
        }
    }

    const submit = async (e: any) => {
        e.preventDefault()

        const obj = { table, fields }
        const created = await axios.post("http://localhost:8000/api/product/create", { table })

        if (created.data.success) {
            await axios.post("http://localhost:8000/api/product/insert", obj)
        }
    }

    return (
        <div className="adminpanel">
            <h3>Create Product</h3>
            <label>Select one of the last saved schemas</label>
            <select onChange={changeName}>
                <option value="" disabled selected>Table Name</option>
                {tableNames.length > 0
                    ? tableNames.map((value: any, index: number) => (
                        <option key={index} value={value}>{value.slice(8)}</option>
                    ))
                    : ""
                }
            </select>
            <form action="submit" onSubmit={submit}>
                {attributes.length > 0
                    ? attributes.map((attribute: any, i: number) => (
                        <>
                            <Input
                                key={i}
                                id={i}
                                attribute={attribute}
                                onChangeInputField={onChangeInputField}
                            />
                            {errors.length > 0 ? errors.map((error: any, index: number) => {
                                return index === i ? <div key={index}>{error}</div> : ""
                            }) : ""}
                        </>
                    ))
                    : ""
                }
                <button disabled={disabledBtn}>Create</button>
            </form>
        </div>
    )
}
