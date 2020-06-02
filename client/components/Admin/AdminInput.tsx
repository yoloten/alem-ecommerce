import React, { useState, useEffect } from "react"
import axios from "axios"

import Dropdown from "../UI/Dropdown"
import Input from "../UI/Input"

// TODO: ADD MASKS, WRITE NORMAL VALIDATIONS AND DEAL WITH ENUMS

export default function AdminInput({ attribute, onChangeInputField, id, val }: any) {
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
                if (validators.required && !value || e.target.required) {
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
        attribute.type = attribute.type.toLowerCase()

        if (attribute.type === "string") {
            return (
                <Input
                    value={val && Object.keys(val).length > 0 ? val[attribute.name] : ""}
                    className="createproduct-input"
                    name={attribute.name}
                    type="text"
                    onChange={changeInput}
                    placeholder={attribute.label}
                    required={true}
                    borderRadius="3px"
                    bgColor="#fff"
                    border={true}
                    width={220}
                    height="31"
                    id={id}
                />
            )
        }
        if (attribute.type === "number") {
            return (
                <Input
                    value={val && Object.keys(val).length > 0 ? val[attribute.name] : ""}
                    className="createproduct-input"
                    type="number"
                    name={attribute.name}
                    onChange={changeInput}
                    placeholder={attribute.label}
                    required={true}
                    borderRadius="3px"
                    bgColor="#fff"
                    border={true}
                    width={210}
                    height="31"
                    id={id}
                />
            )
        }
       
        if (macro) {
            if (macro.type === "enum") {
                return (
                    <Dropdown
                        onChange={changeInput}
                        className="createproduct-input"
                        value={val && Object.keys(val).length > 0 ? val[macro.name] : ""}
                        options={macro.options}
                        borderRadius="3px"
                        borderColor="#f1f1f1"
                        bgColor="#fff"
                        border={true}
                        width={220 + 30}
                        height="40"
                        name={attribute.name} 
                        id={id}
                        placeholder={attribute.label}
                        required={true}
                    />
                )
            }
            if (macro.type === "string") {
                return (
                    <Input
                        value={val && Object.keys(val).length > 0 ? val[macro.name] : ""}
                        className="createproduct-input"
                        required={macro.validators.required}
                        name={attribute.name}
                        borderRadius="3px"
                        bgColor="#fff"
                        border={true}
                        width={220}
                        height="31"
                        type="text"
                        onChange={changeInput}
                        placeholder={macro.validators.mask ? macro.validators.mask : attribute.label}
                        id={id}
                    />
                )
            }

            if (macro.type === "number") {
                return (
                    <Input
                        value={val && Object.keys(val).length > 0 ? val[macro.name] : ""}
                        className="createproduct-input"
                        borderRadius="3px"
                        bgColor="#fff"
                        border={true}
                        width={210}
                        height="31"
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
