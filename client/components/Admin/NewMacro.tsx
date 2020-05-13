import React, { useState } from "react"
import axios from "axios"

export default function AdminMacro(props: any) {
    const [label, setLabel]: any = useState("")
    const [name, setName]: any = useState("")
    const [type, setType]: any = useState("type")
    const [options, setOptions]: any = useState([])
    const [validators, setValidators]: any = useState({})
    const [validatorsList, setValidatorsList]: any = useState([])

    const changeLabel = (e: any) => setLabel(e.target.value)

    const changeName = (e: any) => setName(e.target.value)

    const changeType = (e: any) => {
        setType(e.target.value)

        if (e.target.value === "number") {
            setValidatorsList(["min", "max"])
        }
        if (e.target.value === "string") {
            setValidatorsList(["minLength", "maxLength", "pattern", "pattern-description", "mask"])
        }

        if (e.target.value === "enum") {
            setValidatorsList([])
        }
    }

    const changeOption = (e: any) => {
        const newOptions = [...options]

        if (e.target.name === "label") {
            newOptions[parseInt(e.target.id, 10)].label = e.target.value
            setOptions(newOptions)
        }
        if (e.target.name === "value") {
            newOptions[parseInt(e.target.id, 10)].value = e.target.value
            setOptions(newOptions)
        }

    }

    const addOption = () => setOptions([...options, { label: "", value: "", meta: {} }])

    const onValidatorChange = (e: any) => {
        const { name, value, type, checked }: any = e.target
        const obj: any = {}

        if (type === "checkbox") {
            obj[name] = checked
        } else {
            obj[name] = value
        }

        setValidators({ ...validators, ...obj })
    }

    const submit = async () => {
        const obj: any = {
            label,
            optionType: type === "enum" ? "optionType" : "",
            name,
            type,
            validators: validators === {} ? { required: false } : validators,
        }

        if (type === "enum") {
            if (options.length > 0) {
                obj.options = options
            }
        }

        if (obj.label !== "" && obj.name !== "" && obj.type !== "type") {
            await axios.post("http://localhost:8000/api/product/createmacro", obj)

            props.onMacroSubmit(obj)
        } else {
            console.log("lol")
        }
    }

    return (
        <div className="adminpanel">
            <h3>Add macro</h3>
            <select value={type} onChange={changeType}>
                <option disabled value="type">Type</option>
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="enum">enum</option>
            </select>
            <input type="text" placeholder="Label" onChange={changeLabel} />
            <input type="text" placeholder="Name" onChange={changeName} />

            {type !== "type" ? <h3>Validators</h3> : ""}

            {validatorsList.length > 0
                ? validatorsList.map((item: any, i: number) => {
                    if (type === "number") {
                        return <input
                            key={i}
                            type="number"
                            name={item}
                            placeholder={item}
                            onChange={onValidatorChange}
                        />
                    } else {
                        return <input
                            key={i}
                            type="text"
                            name={item}
                            placeholder={item}
                            onChange={onValidatorChange}
                        />
                    }
                })
                : ""
            }

            {type !== "type"
                ? <>
                    <label htmlFor="required">Required:</label>
                    <input
                        type="checkbox"
                        name="required"
                        id=""
                        onChange={onValidatorChange}
                    />
                </>
                : ""
            }

            {type === "enum" ? <button className="validator-btn" onClick={addOption}>+Add option</button> : ""}

            {type === "enum"
                ? options.map((val: any, index: number) => {
                    return (
                        <div key={`option-${index}`}>
                            <h3>Option {index + 1}</h3>
                            <input
                                id={index.toString()}
                                type="text"
                                name="label"
                                placeholder="Label"
                                onChange={changeOption}
                            />
                            <input
                                type="text"
                                name="value"
                                id={index.toString()}
                                placeholder="Value"
                                onChange={changeOption}
                            />
                        </div>
                    )
                })
                : ""
            }
            <button onClick={submit}>Submit</button>
        </div>
    )
}
