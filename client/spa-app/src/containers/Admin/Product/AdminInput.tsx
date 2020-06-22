import { Options } from "actions/admin/product/attributes"
import React, { useState, useEffect } from "react"
import InputMask from "react-input-mask"
import axios from "axios"

import * as UI from "../../../../../common-components/src"

// TODO: ADD MASKS, WRITE NORMAL VALIDATIONS AND DEAL WITH ENUMS

export default function AdminInput({ attribute, onChangeInputField, id, val, width }: any): JSX.Element {
    const [macro, setState]: any = useState({})

    useEffect(() => {
        const getMacro = async () => {
            const macroFromServer = await axios.get("http://localhost:8000/api/product/attributes/macro", {
                params: { name: attribute.type },
            })
            if (macroFromServer.data) {
                setState(macroFromServer.data)
            }
        }

        if (attribute.type !== "String" || attribute.type !== "number") {
            getMacro()
        }
    }, [attribute])

    const changeInput = (e: any) => {
        const { value, id, name, type, className } = e.target
        const { validators }: any = macro
        let error = ""

        if (validators) {
            if (type === "number") {
                if (parseInt(value, 10) < parseInt(validators.min, 10)) {
                    error = `Value must be greater than ${validators.min}`
                } else if (parseInt(value, 10) > parseInt(validators.max, 10)) {
                    error = `Value must be less than ${validators.max}`
                }
                if ((validators.required && !value) || e.target.required) {
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
                if (validators.required && !value) {
                    error = "This field is required"
                }
            }
        }

        onChangeInputField({ value, id, name, attributeType: attribute.type, className }, error, macro.type)
    }

    const inputTypes = () => {
        const attributeType = attribute.type.toLowerCase()

        if (attributeType === "string") {
            return (
                <UI.Input
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
                    height={31}
                    id={id}
                />
            )
        }
        if (attributeType === "number") {
            return (
                <UI.Input
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
                    width={width}
                    height={31}
                    id={id}
                />
            )
        }

        if (macro) {
            if (macro.type === "enum") {
                return (
                    <>
                        <div>{attribute.label}</div>
                        <div className="secondary-checkboxes">
                            {macro.options.map((option: Options, i: number) => {
                                return (
                                    <div
                                        className="secondary-checkbox"
                                        key={option.uuid}
                                        style={{ marginRight: "20px" }}
                                    >
                                        <UI.Checkbox
                                            id={id}
                                            className={option.value}
                                            name={attribute.name}
                                            value={option.value}
                                            checked={
                                                val && val[macro.name] && val[macro.name].includes(option.name)
                                                    ? true
                                                    : false
                                            }
                                            onChange={changeInput}
                                            width="20px"
                                            height="20px"
                                        />
                                        <div className="secondary-checkbox-name">{option.label}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )
            }

            if (macro.type === "string") {
                return (
                    <UI.Input
                        value={val && Object.keys(val).length > 0 ? val[macro.name] : ""}
                        className="createproduct-input"
                        required={macro.validators.required}
                        name={attribute.name}
                        borderRadius="3px"
                        bgColor="#fff"
                        border={true}
                        width={width}
                        height={31}
                        type="text"
                        onChange={changeInput}
                        placeholder={attribute.label}
                        id={id}
                    />
                )
            }

            if (macro.type === "number") {
                return (
                    <UI.Input
                        value={val && Object.keys(val).length > 0 ? val[macro.name] : ""}
                        className="createproduct-input"
                        borderRadius="3px"
                        bgColor="#fff"
                        border={true}
                        width={width}
                        height={31}
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

    return <div>{inputTypes()}</div>
}
