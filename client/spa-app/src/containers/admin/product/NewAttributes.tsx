import { changeAttributes, addNewAttribute, deleteSuccessMsg } from "reducers/admin/attributeReducer"
import { getAllAttributes, createAttribute, Attribute } from "actions/admin/product/attributes"
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import { RootState } from "reducers"
import { v4 } from "uuid"
import axios from "axios"

import * as UI from "../../../../../common-components/src/"

export default function AdminNewAttributes({ macroConfig, windowWidth }: any): JSX.Element {
    const [err, setErr] = useState("")

    const { macros, success, attributes } = useSelector((state: RootState) => state.attribute)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAttributes())
    }, [macroConfig])

    useEffect(() => {
        setTimeout(() => {
            deleteSuccessMsg()
        }, 3000)
    }, [success])

    const onChangeAttribute = (e: any) => {
        const { name, id, value, checked } = e.target

        dispatch(changeAttributes({ name, value, checked, id: parseInt(id, 10) }))
    }

    const addAttribute = (e: any) => {
        e.preventDefault()

        dispatch(addNewAttribute({ label: "", name: "", type: "", allowFilter: false }))
    }

    const submit = async (e: any) => {
        e.preventDefault()
        const obj = { table: "product", attributes }

        if (attributes.length > 0) {
            dispatch(createAttribute(obj))
        } else {
            setErr("Please, add at least one attribute")
        }
    }

    return (
        <div className="attributes-new">
            <div className="attributes-new-title">Product Attributes</div>
            <div className="attributes-new-subtitle">
                On this page you can create new properties of your product and edit existed ones
            </div>
            <form action="submit" onSubmit={submit} className="admin-attribute-list">
                {attributes.length > 0
                    ? attributes.map((val: Attribute, index: number) => {
                          return (
                              <div key={`attribute-${index}`} className="attribute-item">
                                  <UI.Dropdown
                                      extraTypes={["String", "Number"]}
                                      onChange={onChangeAttribute}
                                      className="attribute-input"
                                      id={index.toString()}
                                      value={val.type}
                                      borderRadius="6px"
                                      bgColor="#f3f3f3"
                                      macros={macros}
                                      border={false}
                                      width={120}
                                      height={40}
                                      name="type"
                                      placeholder="Type"
                                      required={true}
                                  />
                                  <UI.Input
                                      onChange={onChangeAttribute}
                                      id={index.toString()}
                                      placeholder="Name"
                                      borderRadius="6px"
                                      bgColor="#f3f3f3"
                                      border={false}
                                      width={120}
                                      height={31}
                                      type="text"
                                      name="name"
                                      value={val.name}
                                      required={true}
                                  />
                                  <UI.Input
                                      onChange={onChangeAttribute}
                                      id={index.toString()}
                                      placeholder="Label"
                                      borderRadius="6px"
                                      bgColor="#f3f3f3"
                                      border={false}
                                      width={120}
                                      height={31}
                                      name="label"
                                      type="text"
                                      value={val.label}
                                      required={true}
                                  />
                                  <div className="checkbox attribute-input-checkbox">
                                      <div>Allow Filter:</div>
                                      <UI.Checkbox
                                          name="allowFilter"
                                          id={index.toString()}
                                          onChange={onChangeAttribute}
                                          checked={val.allowFilter}
                                          width="26px"
                                          height="26px"
                                      />
                                  </div>
                              </div>
                          )
                      })
                    : ""}
                {attributes.length > 0 ? (
                    <UI.Button
                        borderColor="#eee"
                        border={true}
                        backgroundColor="transparent"
                        content="SAVE CHANGES"
                        color="#92b967"
                        width="140px"
                        fontSize="13px"
                        customStyleObject={{ marginTop: "20px" }}
                    />
                ) : (
                    ""
                )}
                <UI.Button
                    borderColor="#eee"
                    border={true}
                    backgroundColor="transparent"
                    onClick={addAttribute}
                    content="ADD ATTRIBUTE"
                    width="140px"
                    fontSize="13px"
                    customStyleObject={{ marginTop: "60px", marginBottom: "10px" }}
                />
            </form>
            <div
                className="success-message"
                style={{
                    textAlign: "center",
                    marginTop: "10px",
                    color: "red",
                }}
            >
                {err}
            </div>
            <div className="success-message" style={{ color: "red" }}>
                {err}
            </div>
            <div className="success-message" style={{ color: "#5beb78" }}>
                {success}
            </div>
        </div>
    )
}
