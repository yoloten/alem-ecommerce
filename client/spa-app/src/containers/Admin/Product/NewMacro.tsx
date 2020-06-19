import { getAllMacros, Macro, Options, createMacros } from "actions/admin/product/attributes"
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import {
    deleteSuccessMsg,
    addNewMacro,
    addNewOption,
    validatorsChange,
    macrosChange,
    optionsChange,
} from "reducers/admin/attributeReducer"
import { RootState } from "reducers"
import axios from "axios"
import { v4 } from "uuid"

import * as Icons from "../../../../../common-components/icons"
import * as UI from "../../../../../common-components/src"

export default function AdminMacro(props: any): JSX.Element {
    const [err, setErr] = useState("")

    const { macros, success } = useSelector((state: RootState) => state.attribute)
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
        const { name, value, id, checked } = e.target

        dispatch(macrosChange({ name, value, id: parseInt(id, 10), checked }))
    }

    const changeOption = (e: any) => {
        const { id, className, value, name } = e.target

        dispatch(optionsChange({ id: parseInt(id, 10), className: parseInt(className, 10), value, name }))
    }

    const addMacro = () => {
        const newMacro: Macro = {
            validatorsList: [],
            selectable: false,
            validators: {},
            options: [],
            uuid: v4(),
            label: "",
            name: "",
            type: "",
        }

        dispatch(addNewMacro(newMacro))
    }

    const addOption = (e: any) => {
        e.preventDefault()
        const option = {
            uuid: v4(),
            label: "",
            value: "",
            meta: {},
            name: "",
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
                {macros.map((macro, macroIndex: number) => {
                    return (
                        <>
                            <div className="admin-macro-list">
                                <div className="macro-index">{macroIndex + 1}</div>
                                <div className="admin-attribute-macro-props">
                                    <div className="attribute-macro-item">
                                        <UI.Dropdown
                                            id={macroIndex.toString()}
                                            options={[
                                                { value: "string", label: "String" },
                                                { value: "number", label: "Number" },
                                                { value: "enum", label: "Enum" },
                                            ]}
                                            className="attribute-input"
                                            onChange={changeMacroProperties}
                                            borderRadius="6px"
                                            bgColor="#f3f3f3"
                                            border={false}
                                            width={
                                                macro.type === "enum"
                                                    ? props.windowWidth / 10.5
                                                    : props.windowWidth / 8.5
                                            }
                                            height={40}
                                            icon={<Icons.Diagram />}
                                            name="type"
                                            placeholder="Type"
                                            value={macro.type ? macro.type : ""}
                                            required={true}
                                        />
                                        <UI.Input
                                            value={macro.name ? macro.name : ""}
                                            onChange={changeMacroProperties}
                                            className="attribute-input"
                                            id={macroIndex.toString()}
                                            icon={<Icons.Pencil />}
                                            placeholder="Name"
                                            borderRadius="6px"
                                            bgColor="#f3f3f3"
                                            required={true}
                                            border={false}
                                            width={
                                                macro.type === "enum"
                                                    ? props.windowWidth / 12.5
                                                    : props.windowWidth / 10.5
                                            }
                                            height={31}
                                            type="text"
                                            name="name"
                                        />
                                        <UI.Input
                                            value={macro.label ? macro.label : ""}
                                            className="attribute-input last"
                                            onChange={changeMacroProperties}
                                            id={macroIndex.toString()}
                                            icon={<Icons.Blank />}
                                            placeholder="Label"
                                            borderRadius="6px"
                                            bgColor="#f3f3f3"
                                            required={true}
                                            border={false}
                                            width={
                                                macro.type === "enum"
                                                    ? props.windowWidth / 12.5
                                                    : props.windowWidth / 10.5
                                            }
                                            height={31}
                                            type="text"
                                            name="label"
                                        />
                                        {macro.type === "enum" && (
                                            <div className="macro-selectable">
                                                <div className="attribute-checkbox-label">Selectable:</div>
                                                <UI.Checkbox
                                                    checked={macro.selectable ? true : false}
                                                    onChange={changeMacroProperties}
                                                    id={macroIndex.toString()}
                                                    name="selectable"
                                                    height="20px"
                                                    width="20px"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {macro.type === "enum" ? (
                                        <div className="attributes-new-secondtitle">Options</div>
                                    ) : (
                                        ""
                                    )}
                                    <div className="attribute-enum-options">
                                        {macro.type === "enum" && macro.options && macro.options.length > 0
                                            ? macro.options.map((val, index: number) => {
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
                                                              width={props.windowWidth / 11}
                                                              height={31}
                                                              border={true}
                                                              borderRadius="0px"
                                                              className={`${macroIndex}`}
                                                              icon={<Icons.Pencil />}
                                                              required={true}
                                                              value={val.name}
                                                          />
                                                          <UI.Input
                                                              id={index.toString()}
                                                              type="text"
                                                              name="label"
                                                              placeholder="Label"
                                                              onChange={changeOption}
                                                              width={props.windowWidth / 11}
                                                              height={31}
                                                              border={true}
                                                              borderRadius="0px"
                                                              className={`${macroIndex}`}
                                                              icon={<Icons.Blank />}
                                                              required={true}
                                                              value={val.label}
                                                          />
                                                          <UI.Input
                                                              type="text"
                                                              name="value"
                                                              id={index.toString()}
                                                              placeholder="Value"
                                                              onChange={changeOption}
                                                              width={props.windowWidth / 11}
                                                              height={31}
                                                              border={true}
                                                              borderRadius="0px"
                                                              className={`${macroIndex}`}
                                                              required={true}
                                                              value={val.value}
                                                              icon={<Icons.Diagram />}
                                                          />
                                                          <div className="delete-option">
                                                              <Icons.Trash />
                                                          </div>
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
                                                ? macro.validatorsList.slice(0, 3).map((item, i: number) => {
                                                      if (item === "required") {
                                                          return (
                                                              <div
                                                                  key={i}
                                                                  className="attrbute-checkbox-div"
                                                                  style={{
                                                                      width: "115px",
                                                                  }}
                                                              >
                                                                  <div className="attribute-checkbox-label">
                                                                      Required:
                                                                  </div>
                                                                  <UI.Checkbox
                                                                      name="required"
                                                                      id={macroIndex.toString()}
                                                                      onChange={onValidatorChange}
                                                                      width="20px"
                                                                      height="20px"
                                                                      checked={macro.validators.required ? true : false}
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
                                                                      value={
                                                                          macro.validators[item]
                                                                              ? macro.validators[item]
                                                                              : "0"
                                                                      }
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
                                                                      type={
                                                                          item === "minLength" || item === "maxLength"
                                                                              ? "number"
                                                                              : "text"
                                                                      }
                                                                      name={item}
                                                                      placeholder={item}
                                                                      borderRadius="0px"
                                                                      onChange={onValidatorChange}
                                                                      width={115}
                                                                      border={true}
                                                                      height={31}
                                                                      value={
                                                                          macro.validators[item]
                                                                              ? macro.validators[item]
                                                                              : ""
                                                                      }
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
                                                ? macro.validatorsList.slice(3, 6).map((item, i: number) => {
                                                      if (item === "required") {
                                                          return (
                                                              <div
                                                                  key={i}
                                                                  className="attrbute-checkbox-div"
                                                                  style={{
                                                                      width: "150px",
                                                                  }}
                                                              >
                                                                  <div className="attribute-checkbox-label">
                                                                      Required:
                                                                  </div>
                                                                  <UI.Checkbox
                                                                      type="checkbox"
                                                                      name="required"
                                                                      id={macroIndex.toString()}
                                                                      onChange={onValidatorChange}
                                                                      width="20px"
                                                                      height="20px"
                                                                      checked={macro.validators.required ? true : false}
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
