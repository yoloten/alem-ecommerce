import React, { useState, useEffect } from "react"
import axios from "axios"

export default function AdminInput({ attribute, onChangeInputField, id }: any) {
    const [macro, setState]: any = useState({})

    useEffect(() => {
        const getMacro = async () => {
            const macroFromServer = await axios.get("http://localhost:8000/api/product/macro", { 
                params: { name: attribute.type },
            })

            setState(macroFromServer.data)
        }

        if (attribute.type !== "String" || attribute.type !== "number") {
            getMacro()
        }
    }, [attribute])

    const changeInput = (e: any) => {
        const { value, id, name, type } = e.target
        const { validators }: any = macro
        let error = ""

        if (validators) {
            if (type === "number") {
                if (parseInt(value, 10) < parseInt(validators.min, 10)) {
                    error = `Value must be greater than ${validators.min}`
                }
                else if (parseInt(value, 10) > parseInt(validators.max, 10)) {
                    error = `Value must be less than ${validators.max}`
                }
                if (validators.required && !value) {
                    error = "This field is required"
                }
            }
            if (type === "text") {
                if (value.length < parseInt(validators.minLength, 10)) {
                    error = `Write at least ${validators.minLength} characters` 
                }
                if (value.length > parseInt(validators.maxLength, 10)) {
                    error = `Write less than ${validators.minLength} characters` 
                }
                if (validators.pattern) {
                    const newRegExp = new RegExp(validators.pattern)
    
                    if (!newRegExp.test(value)) {
                       error = "Please follow the pattern" 
                    }
                }
                if (validators.required && !value) {
                    error = "This field is required"
                }
                
            }
        }

        onChangeInputField({ value, id, name, attributeType: attribute.type }, error, macro.type)
    }

    const inputTypes = () => {
        if (attribute.type === "String" || attribute.type === "string") {
            return (
                <input
                    name={attribute.name}
                    type="text"
                    onChange={changeInput}
                    placeholder={attribute.label}
                    id={id}
                />
            )
        }
        if (attribute.type === "number") {
            return (
                <input
                    type="number"
                    name={attribute.name}
                    onChange={changeInput}
                    placeholder={attribute.label}
                    id={id}
                />
            )
        }

        if (macro) {
            if (macro.type === "enum") {
                return (
                    <select
                        required={macro.validators.required}
                        name={attribute.name} id={id}
                        onChange={changeInput}
                    >
                        <option value="" disabled selected>
                            {attribute.label}
                        </option>
                        {macro.options.map((option: any, index: any) => (
                            <option
                                key={index}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                )
            }
            if (macro.type === "string") {
                return (
                    <input
                        required={macro.validators.required}
                        name={attribute.name}
                        type="text"
                        onChange={changeInput}
                        placeholder={macro.validators.mask ? macro.validators.mask : attribute.label}
                        id={id}
                    />
                )
            }

            if (macro.type === "number") {
                return (
                    <input
                        required={macro.validators.required}
                        type="number"
                        name={attribute.name}
                        onChange={changeInput}
                        placeholder={attribute.label}
                        id={id}
                    />
                )
            }
        }
    }

    return (
        <div>
            {inputTypes()}
        </div>
    )
}
