import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import { v4 } from "uuid"

import * as UI from "../../../../../common-components/src/"

export default function AdminMacro(props: any) {
    const [macros, setMacros]: any = useState([])
    const [successMsg, setSuccessMsg] = useState("")
    const [err, setErr] = useState("")

    useEffect(() => {
        const getAllMacros = async () => {
            const allMacros = await axios.get("http://localhost:8000/api/product/allmacros")

            if (allMacros.data) {
                setMacros(allMacros.data)
            }
        }

        getAllMacros()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setSuccessMsg("")
        }, 3000)
    }, [successMsg])

    const changeMacroProperties = (e: any) => {
        const newMacros = [...macros]

        if (e.target.name === "type") {
            newMacros[parseInt(e.target.id, 10)].type = e.target.value
            newMacros[parseInt(e.target.id, 10)].validators = {}

            if (e.target.value === "number") {
                newMacros[parseInt(e.target.id, 10)].validatorsList = ["min", "max", "required"]
            }
            if (e.target.value === "string") {
                newMacros[parseInt(e.target.id, 10)].validatorsList = [
                    "minLength",
                    "maxLength",
                    "pattern",
                    "pattern-description",
                    "mask",
                    "required",
                ]
            }

            if (e.target.value === "enum") {
                newMacros[parseInt(e.target.id, 10)].validatorsList = ["required"]
            }

            setMacros(newMacros)
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

    const addMacro = () =>
        setMacros([
            ...macros,
            {
                label: "",
                name: "",
                type: "",
                validators: {},
                options: [],
                validatorsList: [],
                uuid: v4(),
            },
        ])

    const addOption = (e: any) => {
        e.preventDefault()
        const newMacro = [...macros]

        newMacro[parseInt(e.target.id, 10)].options = [
            ...newMacro[parseInt(e.target.id, 10)].options,
            {
                name: "",
                label: "",
                value: "",
                meta: {},
                uuid: v4(),
            },
        ]
        setMacros(newMacro)
    }

    const onValidatorChange = (e: any) => {
        const { name, value, type, checked, id, className }: any = e.target
        const newMacros = [...macros]

        if (type === "checkbox") {
            newMacros[parseInt(id, 10)].validators[name] = checked
        } else {
            newMacros[parseInt(id, 10)].validators[name] = value
        }
        setMacros(newMacros)
    }

    const submit = async (e: any) => {
        e.preventDefault()

        if (macros && macros.length > 0) {
            const postMacros = await axios.post("http://localhost:8000/api/product/createmacro", macros)

            if (postMacros.data.msg) {
                setErr(postMacros.data.msg)
            }
            if (postMacros.data.success) {
                setSuccessMsg("Success!")
            }

            props.onMacroSubmit(macros)
        } else {
            setErr("Add macro")
        }
    }

    return (
        <div className="macro">
            <div className="attributes-new-title">Product Macro-Types</div>
            <div className="attributes-new-subtitle">
                Here you can create and edit various macros, including enumerations
            </div>
            <form action="submit" onSubmit={submit}>
                {macros.map((macro: any, macroIndex: number) => {
                    return (
                        <>
                            <div className="admin-macro-list">
                                <div className="macro-index">{macroIndex + 1}</div>
                                <div className="admin-attribute-macro-props">
                                    <div className="attribute-macro-item">
                                        <UI.Dropdown
                                            id={macroIndex.toString()}
                                            options={[{ value: "string" }, { value: "number" }, { value: "enum" }]}
                                            className="attribute-input"
                                            onChange={changeMacroProperties}
                                            borderRadius="6px"
                                            bgColor="#f3f3f3"
                                            border={false}
                                            width={120}
                                            height={40}
                                            name="type"
                                            placeholder="Type"
                                            value={macro.type ? macro.type : ""}
                                            required={true}
                                        />
                                        <UI.Input
                                            id={macroIndex.toString()}
                                            className="attribute-input"
                                            onChange={changeMacroProperties}
                                            placeholder="Name"
                                            borderRadius="6px"
                                            bgColor="#f3f3f3"
                                            border={false}
                                            width={120}
                                            height={31}
                                            type="text"
                                            name="name"
                                            required={true}
                                            value={macro.name ? macro.name : ""}
                                        />
                                        <UI.Input
                                            id={macroIndex.toString()}
                                            className="attribute-input last"
                                            onChange={changeMacroProperties}
                                            placeholder="Label"
                                            borderRadius="6px"
                                            bgColor="#f3f3f3"
                                            border={false}
                                            width={120}
                                            height={31}
                                            type="text"
                                            name="label"
                                            required={true}
                                            value={macro.label ? macro.label : ""}
                                        />
                                    </div>
                                    {macro.type === "enum" ? (
                                        <div className="attributes-new-secondtitle">Options</div>
                                    ) : (
                                        ""
                                    )}
                                    <div className="attribute-enum-options">
                                        {macro.type === "enum" && macro.options && macro.options.length > 0
                                            ? macro.options.map((val: any, index: number) => {
                                                  return (
                                                      <div
                                                          key={`option-${index}`}
                                                          className="attributes-validators-list"
                                                      >
                                                          <UI.Input
                                                              id={index.toString()}
                                                              type="text"
                                                              name="name"
                                                              placeholder="Name"
                                                              onChange={changeOption}
                                                              width={100}
                                                              height={31}
                                                              border={true}
                                                              borderRadius="0px"
                                                              className={`${macroIndex}`}
                                                              required={true}
                                                              value={val.name}
                                                          />
                                                          <UI.Input
                                                              id={index.toString()}
                                                              type="text"
                                                              name="label"
                                                              placeholder="Label"
                                                              onChange={changeOption}
                                                              width={100}
                                                              height={31}
                                                              border={true}
                                                              borderRadius="0px"
                                                              className={`${macroIndex}`}
                                                              required={true}
                                                              value={val.label}
                                                          />
                                                          <UI.Input
                                                              type="text"
                                                              name="value"
                                                              id={index.toString()}
                                                              placeholder="Value"
                                                              onChange={changeOption}
                                                              width={100}
                                                              height={31}
                                                              border={true}
                                                              borderRadius="0px"
                                                              className={`${macroIndex}`}
                                                              required={true}
                                                              value={val.value}
                                                          />
                                                          <div className="delete-option">del</div>
                                                      </div>
                                                  )
                                              })
                                            : ""}
                                        {macro.type === "enum" ? (
                                            <UI.Button
                                                borderColor="#eee"
                                                border={true}
                                                backgroundColor="transparent"
                                                onClick={addOption}
                                                content="ADD OPTION"
                                                width="120px"
                                                fontSize="13px"
                                                customStyleObject={{ margin: "10px" }}
                                                id={macroIndex.toString()}
                                                type="button"
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    {macro.type ? <div className="attributes-new-secondtitle">Validators</div> : ""}
                                    <div className="attribute-validators">
                                        <div className="attributes-validators-list">
                                            {macro.validatorsList
                                                ? macro.validatorsList.slice(0, 3).map((item: any, i: number) => {
                                                      if (item === "required") {
                                                          return (
                                                              <div
                                                                  className="attrbute-checkbox-div"
                                                                  style={{
                                                                      width: "115px",
                                                                  }}
                                                              >
                                                                  <div className="attribute-checkbox-label">
                                                                      Required:
                                                                  </div>
                                                                  <input
                                                                      type="checkbox"
                                                                      name="required"
                                                                      id={macroIndex.toString()}
                                                                      onChange={onValidatorChange}
                                                                      className={macro.type}
                                                                      checked={macro.validators.required}
                                                                  />
                                                              </div>
                                                          )
                                                      } else {
                                                          if (macro.type === "number") {
                                                              return (
                                                                  <UI.Input
                                                                      key={i}
                                                                      type="number"
                                                                      name={item}
                                                                      placeholder={item}
                                                                      onChange={onValidatorChange}
                                                                      borderRadius="0px"
                                                                      width={115}
                                                                      border={true}
                                                                      height={31}
                                                                      id={macroIndex.toString()}
                                                                      className={macro.type}
                                                                      value={macro.validators[item]}
                                                                      min={
                                                                          item === "max"
                                                                              ? macros[macroIndex].validators.min
                                                                              : ""
                                                                      }
                                                                  />
                                                              )
                                                          } else {
                                                              return (
                                                                  <UI.Input
                                                                      key={i}
                                                                      type="text"
                                                                      name={item}
                                                                      placeholder={item}
                                                                      borderRadius="0px"
                                                                      onChange={onValidatorChange}
                                                                      width={115}
                                                                      border={true}
                                                                      height={31}
                                                                      value={macro.validators[item]}
                                                                      id={macroIndex.toString()}
                                                                      className={macro.type}
                                                                      min={
                                                                          item === "maxLength"
                                                                              ? macros[macroIndex].validators.minLength
                                                                              : ""
                                                                      }
                                                                  />
                                                              )
                                                          }
                                                      }
                                                  })
                                                : ""}
                                        </div>
                                        <div className="attributes-validators-list">
                                            {macro.type === "string" && macro.validatorsList
                                                ? macro.validatorsList.slice(3, 6).map((item: any, i: number) => {
                                                      if (item === "required") {
                                                          return (
                                                              <div
                                                                  className="attrbute-checkbox-div"
                                                                  style={{
                                                                      width: "135px",
                                                                  }}
                                                              >
                                                                  <div className="attribute-checkbox-label">
                                                                      Required:
                                                                  </div>
                                                                  <input
                                                                      type="checkbox"
                                                                      name="required"
                                                                      id={macroIndex.toString()}
                                                                      onChange={onValidatorChange}
                                                                      className={macro.type}
                                                                      checked={macro.validators.required}
                                                                  />
                                                              </div>
                                                          )
                                                      } else {
                                                          return (
                                                              <UI.Input
                                                                  key={i}
                                                                  type="text"
                                                                  name={item}
                                                                  placeholder={item}
                                                                  borderRadius="0px"
                                                                  onChange={onValidatorChange}
                                                                  width={115}
                                                                  border={true}
                                                                  value={macro.validators[item]}
                                                                  height={31}
                                                                  className={macro.type}
                                                                  id={macroIndex.toString()}
                                                              />
                                                          )
                                                      }
                                                  })
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
                {macros.length > 0 ? (
                    <UI.Button
                        borderColor="#eee"
                        border={true}
                        backgroundColor="transparent"
                        content="SAVE CHANGES"
                        color="#92b967"
                        width="160px"
                        fontSize="13px"
                        customStyleObject={{ margin: "auto", marginTop: "10px" }}
                    />
                ) : (
                    ""
                )}
            </form>
            <div className="success-message" style={{ color: "red" }}>
                {err}
            </div>
            <div className="success-message" style={{ color: "#5beb78" }}>
                {successMsg}
            </div>

            <UI.Button
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
