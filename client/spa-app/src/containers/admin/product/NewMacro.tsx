import { getAllMacros, Macro, Options, createMacros } from "actions/admin/product"
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import {
    deleteSuccessMsg,
    addNewMacro,
    addNewOption,
    validatorsChange,
    macrosChange,
    optionsChange,
} from "reducers/admin/productReducer"
import { RootState } from "reducers"
import axios from "axios"
import { v4 } from "uuid"

import * as UI from "../../../../../common-components/src/"

export default function AdminMacro(props: any): JSX.Element {
    const [err, setErr] = useState("")

    const { macros, success } = useSelector((state: RootState) => state.product)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllMacros())
    }, [])

    useEffect(() => {
        setTimeout(() => {
            dispatch(deleteSuccessMsg())
        }, 3000)
    }, [success])

    const changeMacroProperties = (e: any) => {
        const { name, value, id } = e.target

        dispatch(macrosChange({ name, value, id: parseInt(id, 10) }))
    }

    const changeOption = (e: any) => {
        const { id, className, value, name } = e.target

        dispatch(optionsChange({ id: parseInt(id, 10), className: parseInt(className, 10), value, name }))
    }

    const addMacro = () => {
        const newMacro: Macro = {
            label: "",
            name: "",
            type: "",
            validators: {},
            options: [],
            validatorsList: [],
            uuid: v4(),
        }

        dispatch(addNewMacro(newMacro))
    }

    const addOption = (e: any) => {
        e.preventDefault()
        const option = {
            name: "",
            label: "",
            value: "",
            meta: {},
            uuid: v4(),
        }

        dispatch(addNewOption({ id: parseInt(e.target.id, 10), option }))
    }

    const onValidatorChange = (e: any) => {
        const { name, value, type, checked, id }: any = e.target

        dispatch(validatorsChange({ name, value, type, checked, id }))
    }

    const submit = async (e: any) => {
        e.preventDefault()

        if (macros && macros.length > 0) {
            dispatch(createMacros(macros))

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
                {success}
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
