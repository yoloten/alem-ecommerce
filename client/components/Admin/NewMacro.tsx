import React, { useState, useRef, useEffect } from "react"
import axios from "axios"

import Dropdown from "../UI/Dropdown"
import Button from "../UI/Button"
import Input from "../UI/Input"

export default function AdminMacro(props: any) {
    const [options, setOptions]: any = useState([])
    const [validators, setValidators]: any = useState({})
    const [validatorsList, setValidatorsList]: any = useState([])
    const [macros, setMacros]: any = useState([])
    
    const changeMacroProperties = (e: any) => {
        const newMacros = [...macros]

        if (e.target.name === "type") {
            newMacros[parseInt(e.target.id, 10)].type = e.target.value
            setMacros(newMacros)

            if (e.target.value === "number") {
                setValidatorsList(["min", "max", "required"])
            }
            if (e.target.value === "string") {
                setValidatorsList(["minLength", "maxLength", "pattern", "pattern-description", "mask", "required"])
            }

            if (e.target.value === "enum") {
                setValidatorsList(["required"])
            }
        }

        if (e.target.name === "name") {
            newMacros[parseInt(e.target.id, 10)].name = e.target.value
            setMacros(newMacros)
        }
        if (e.target.name === "label") {
            newMacros[parseInt(e.target.id, 10)].label = e.target.value
            setMacros(newMacros)
        }
    }
    // console.log(macros)
    const changeOption = (e: any) => {
        const newMacros = [...macros]
        const className = e.target.className.slice(-1)

        if (e.target.name === "name") {
            newMacros[parseInt(className, 10)].options[parseInt(e.target.id, 10)].name = e.target.value
            setMacros(newMacros)
        }
        if (e.target.name === "label") {
            newMacros[parseInt(className, 10)].options[parseInt(e.target.id, 10)].label = e.target.value
            setMacros(newMacros)
        }
        if (e.target.name === "value") {
            newMacros[parseInt(className, 10)].options[parseInt(e.target.id, 10)].value = e.target.value
            setMacros(newMacros)
        }

    }

    const addMacro = () => setMacros([...macros, { label: "", name: "", type: "", validators: {}, options: [] }])

    const addOption = (e: any) => {
        const newMacro = [...macros]
        newMacro[parseInt(e.target.id, 10)].options = [...newMacro[parseInt(e.target.id, 10)].options, { name: "", label: "", value: "", meta: {} }]
        setMacros(newMacro)
    }

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
        // const obj: any = {
        //     label,
        //     optionType: type === "enum" ? "optionType" : "",
        //     name,
        //     type,
        //     validators: validators === {} ? { required: false } : validators,
        // }

        // if (type === "enum") {
        //     if (options.length > 0) {
        //         obj.options = options
        //     }
        // }

        // if (obj.label !== "" && obj.name !== "" && obj.type !== "type") {
        //     await axios.post("http://localhost:8000/api/product/createmacro", obj)

        //     props.onMacroSubmit(obj)
        // } else {
        //     console.log("lol")
        // }
    }

    const setInputWidth = () => {
        if (props.windowWidth > 1800) {
            return 180
        }
        if (props.windowWidth > 1700) {
            return 170
        }
        if (props.windowWidth >= 1500) {
            return 140
        }
        if (props.windowWidth < 1500) {
            return 100
        }

        if (props.windowWidth < 1650) {
            return 140
        }

        return 100
    }
    
    return (
        <div className="macro">
            <div className="attributes-new-title">Product Macro-Types</div>
            <div className="attributes-new-subtitle">
                Here you can create and edit various macros, including enumerations
            </div>
            {macros.map((macro: any, macroIndex: number) => {
                return (
                    <>
                        <div className="admin-attribute-list">
                            <div className="attribute-macro-item">
                                <Dropdown
                                    id={macroIndex.toString()}
                                    options={[{ value: "string" }, { value: "number" }, { value: "enum" }]}
                                    className="attribute-input"
                                    onChange={changeMacroProperties}
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    border={false}
                                    width={setInputWidth()}
                                    height="40"
                                    name="type"
                                    placeholder={true}
                                    value={macro.type ? macro.type : ""}
                                />
                                <Input
                                    id={macroIndex.toString()}
                                    className="attribute-input"
                                    onChange={changeMacroProperties}
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
                                    id={macroIndex.toString()}
                                    className="attribute-input last"
                                    onChange={changeMacroProperties}
                                    placeholder="Label"
                                    borderRadius="6px"
                                    bgColor="#f3f3f3"
                                    border={false}
                                    width={setInputWidth()}
                                    height="31"
                                    type="text"
                                    name="label"
                                />
                            </div>
                            {macro.type === "enum" ? <div className="attributes-new-secondtitle">Options</div> : ""}
                            <div className="attribute-enum-options">
                                {macro.type === "enum"
                                    ? macro.options.map((val: any, index: number) => {
                                        return (
                                            <div key={`option-${index}`} className="attributes-validators-list">
                                                <Input
                                                    id={index.toString()}
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    onChange={changeOption}
                                                    width={setInputWidth() - 20}
                                                    height="31"
                                                    border={true}
                                                    borderRadius="0px"
                                                    className={`${macroIndex}`}
                                                />
                                                <Input
                                                    id={index.toString()}
                                                    type="text"
                                                    name="label"
                                                    placeholder="Label"
                                                    onChange={changeOption}
                                                    width={setInputWidth() - 20}
                                                    height="31"
                                                    border={true}
                                                    borderRadius="0px"
                                                    className={`${macroIndex}`}
                                                />
                                                <Input
                                                    type="text"
                                                    name="value"
                                                    id={index.toString()}
                                                    placeholder="Value"
                                                    onChange={changeOption}
                                                    width={setInputWidth() - 20}
                                                    height="31"
                                                    border={true}
                                                    borderRadius="0px"
                                                    className={`${macroIndex}`}
                                                />
                                                <div className="delete-option">del</div>
                                            </div>
                                        )
                                    })
                                    : ""
                                }
                                {macro.type === "enum"
                                    ? <Button
                                        borderColor="#eee"
                                        border={true}
                                        backgroundColor="transparent"
                                        onClick={addOption}
                                        content="ADD OPTION"
                                        width="120px"
                                        fontSize="13px"
                                        customStyleObject={{ margin: "10px" }}
                                        id={macroIndex.toString()}
                                    />
                                    : ""
                                }
                            </div>
                            {macro.type ? <div className="attributes-new-secondtitle">Validators</div> : ""}
                            <div className="attribute-validators">
                                <div className="attributes-validators-list" >
                                    {validatorsList.slice(0, 3).map((item: any, i: number) => {
                                        if (item === "required") {
                                            return <div
                                                className="attrbute-checkbox-div"
                                                style={{ width: setInputWidth() - 5 + "px" }}
                                            >
                                                <div className="attribute-checkbox-label">Required:</div>
                                                <input
                                                    type="checkbox"
                                                    name="required"
                                                    id=""
                                                    onChange={onValidatorChange}
                                                />
                                            </div>
                                        } else {
                                            if (macro.type === "number") {
                                                return <Input
                                                    key={i}
                                                    type="number"
                                                    name={item}
                                                    placeholder={item}
                                                    onChange={onValidatorChange}
                                                    borderRadius="0px"
                                                    width={setInputWidth() - 5}
                                                    border={true}
                                                    height="31"
                                                />
                                            } else {
                                                return <Input
                                                    key={i}
                                                    type="text"
                                                    name={item}
                                                    placeholder={item}
                                                    borderRadius="0px"
                                                    onChange={onValidatorChange}
                                                    width={setInputWidth() - 5}
                                                    border={true}
                                                    height="31"
                                                />
                                            }
                                        }
                                    })}
                                </div>
                                <div className="attributes-validators-list" >
                                    {macro.type === "string"
                                        ? validatorsList.slice(3, 6).map((item: any, i: number) => {
                                            if (item === "required") {
                                                return <div
                                                    className="attrbute-checkbox-div"
                                                    style={{ width: setInputWidth() + 15 + "px" }}
                                                >
                                                    <div className="attribute-checkbox-label">Required:</div>
                                                    <input
                                                        type="checkbox"
                                                        name="required"
                                                        id=""
                                                        onChange={onValidatorChange}
                                                    />
                                                </div>
                                            } else {
                                                return <Input
                                                    key={i}
                                                    type="text"
                                                    name={item}
                                                    placeholder={item}
                                                    borderRadius="0px"
                                                    onChange={onValidatorChange}
                                                    width={setInputWidth() - 5}
                                                    border={true}
                                                    height="31"
                                                />
                                            }
                                        })
                                        : ""
                                    }
                                </div>
                            </div>
                            <Button
                                borderColor="#eee"
                                border={true}
                                backgroundColor="transparent"
                                onClick={submit}
                                content="SAVE CHANGES"
                                color="#92b967"
                                width="160px"
                                fontSize="13px"
                                customStyleObject={{ margin: "10px" }}
                            />
                        </div>
                    </>
                )
            })}
            <Button
                backgroundColor="#03a9f5"
                onClick={addMacro}
                content="ADD MACRO"
                color="#fff"
                width="160px"
                fontSize="13px"
                customStyleObject={{ margin: "auto", marginTop: "40px" }}
            />
        </div>
    )
}
