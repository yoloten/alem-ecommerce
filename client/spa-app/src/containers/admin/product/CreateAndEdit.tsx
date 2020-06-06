import React, { useEffect, useState, useCallback } from "react"
import { b64toBlob } from "../../../utils/b64ToBlob"
import { useDropzone } from "react-dropzone"
import { useCurrentRoute } from "react-navi"
import axios from "axios"

import * as Icons from "../../../../../common-components/icons"
import * as UI from "../../../../../common-components/src/"
import AdminMainContent from "../UI/AdminMainContent"
import AdminInput from "./AdminInput"

export default function CreateProduct(): JSX.Element {
    const [categories, setCategries]: any = useState([])
    const [attributes, setAttributes]: any = useState([])
    const [fields, setFields]: any = useState([])
    const [errors, setErrors]: any = useState([])
    const [disabledBtn, setDisabledBtn]: any = useState(true)
    const [photos, setPhotos]: any = useState([])
    const [mainProperties, setMainProperites] = useState({
        name: "",
        description: "",
        price: 0,
        count: 0,
        discount: 0,
        currency: "",
        category: "",
    })
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop: (acceptedFiles: any) => {
            setPhotos([...photos, acceptedFiles])
        },
    })
    const route = useCurrentRoute()
    const { pathname, query } = route.url

    useEffect(() => {
        const getDataFromServer = async () => {
            const schema = await axios.get("http://localhost:8000/api/product/schema", {
                params: { table: "product" },
            })
            const getCategory = await axios.get("http://localhost:8000/api/category/last")

            if (schema.data && schema.data.attributes.length > 0) {
                setAttributes(schema.data.attributes)

                if (pathname === "/admin/editproduct" && query.id) {
                    const product: any = await axios.get("http://localhost:8000/api/product/onebyid", {
                        params: { id: query.id, edit: true },
                    })

                    if (product.data.photos && product.data.photos.length > 0) {
                        const photosArr: any = []

                        for (let i = 0; i < product.data.photos.length; i++) {
                            const content = "image/jpeg"
                            const blob = b64toBlob(product.data.photos[i].image, content)
                            const file = new File([blob], product.data.photos[i].name, { type: content })

                            photosArr.push(file)
                        }

                        setPhotos(photosArr)
                    }

                    if (product.data) {
                        const newFields = [...fields]

                        schema.data.attributes.map((attr: any, i: number) => {
                            return Object.keys(product.data).map((key: string) => {
                                const obj: any = {}

                                if (key === attr.name + "_name") {
                                    obj[attr.name] = product.data[attr.name + "_name"]
                                    obj.type = attr.type
                                    newFields.push(obj)
                                } else if (key === attr.name) {
                                    obj[attr.name] = product.data[attr.name]
                                    obj.type = attr.type
                                    newFields.push(obj)
                                }
                            })
                        })

                        setFields(newFields)
                        setMainProperites((state: any) => ({
                            ...state,
                            ...{
                                name: product.data.name,
                                description: product.data.description,
                                price: product.data.price,
                                count: product.data.count,
                                discount: product.data.discount,
                                currency: product.data.currency,
                                category: product.data.category_uuid,
                                id: product.data.id,
                            },
                        }))
                    }
                } else {
                    const arr = []
                    const errArr = []

                    for (let i = 0; i < schema.data.attributes.length; i++) {
                        arr.push({})
                        errArr.push("")
                    }

                    setFields(arr)
                    setErrors(errArr)
                }
            }
            if (getCategory.data && getCategory.data.length > 0) {
                setCategries(getCategory.data)
            }
        }

        getDataFromServer()
    }, [])

    const deletePhoto = async (index: number) => {
        const newPhotos = [...photos]

        if (pathname === "/admin/editproduct" && query.id) {
            await axios.delete("http://localhost:8000/api/product/deletephoto", {
                data: { filename: newPhotos[index].name },
            })
        }

        newPhotos.splice(index, 1)
        setPhotos(newPhotos)
    }

    const changeMainProperties = (e: any) => {
        e.persist()
        setMainProperites((state: any) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const onChangeInputField = (field: any, err: any, type: any) => {
        const newFields = [...fields]
        const newErrors = [...errors]
        const { value, id, name, attributeType } = field

        if (type === "enum") {
            const arr: any = [...[newFields[parseInt(id, 10)][name]]]

            arr.push(value)

            newFields[parseInt(id, 10)][name] = arr.flat().filter((a: any) => {
                return a != null || a !== undefined
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

        const formData = new FormData()
        const flatPhotoArr = [...photos.flat()]

        for (let i = 0; i < photos.length; i++) {
            formData.append("photos[]", flatPhotoArr[i])
        }

        formData.append("fields", JSON.stringify(fields))
        formData.append("mainProperties", JSON.stringify(mainProperties))

        if (pathname === "/admin/editproduct" && query.id) {
            await axios.put("http://localhost:8000/api/product/update", formData)
        } else {
            const created = await axios.post("http://localhost:8000/api/product/create", { table: "product" })

            if (created.data.success) {
                await axios.post("http://localhost:8000/api/product/insert", formData)
            }
        }
    }

    return (
        <AdminMainContent>
            <div className="admin-right-side">
                <div className="admin-title">Create Product</div>
                <div className="admin-subtitle">On this page you can create a product from properties you defined</div>
                <form className="admin-form" action="submit" onSubmit={submit}>
                    <div className="createproduct-attributes">
                        <div className="main-attributes">
                            <div className="createproduct-secondtitle">Main Attributes</div>
                            <div className="createproduct-dropzone-photolist">
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <Icons.AddImage />
                                </div>
                                <div className="photos-list">
                                    {photos.length === 0 ? (
                                        <div className="dropzone-text">Maximum 8 photos are allowed</div>
                                    ) : (
                                        photos.flat().map((file: any, index: number) => {
                                            return (
                                                <div key={index} className="craeteproduct-photos">
                                                    <img
                                                        className="createproduct-img"
                                                        height="40"
                                                        width="40"
                                                        src={URL.createObjectURL(file)}
                                                        alt=""
                                                    />
                                                    <div
                                                        className="photo-delete"
                                                        id={index.toString()}
                                                        onClick={() => deletePhoto(index)}
                                                    >
                                                        <Icons.Trash style={{ zIndex: "-1", position: "relative" }} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                            <UI.Input
                                className="createproduct-input"
                                onChange={changeMainProperties}
                                placeholder="Name"
                                borderRadius="3px"
                                bgColor="#fff"
                                border={true}
                                width={220}
                                height={31}
                                type="text"
                                name="name"
                                value={mainProperties.name}
                                required={true}
                                id="input"
                            />
                            <UI.Dropdown
                                onChange={changeMainProperties}
                                className="createproduct-input"
                                value={mainProperties.category}
                                options={categories}
                                borderRadius="3px"
                                borderColor="#f1f1f1"
                                bgColor="#fff"
                                border={true}
                                width={220 + 30}
                                height={40}
                                name="category"
                                placeholder="Category"
                                required={true}
                                id="dropdown"
                            />
                            <UI.Input
                                onChange={changeMainProperties}
                                className="createproduct-input"
                                placeholder="Description"
                                borderRadius="3px"
                                bgColor="#fff"
                                border={true}
                                width={220}
                                height={31}
                                type="text"
                                name="description"
                                value={mainProperties.description}
                                required={true}
                                id="input"
                            />
                            <UI.Input
                                onChange={changeMainProperties}
                                className="createproduct-input"
                                placeholder="Count"
                                borderRadius="3px"
                                bgColor="#fff"
                                border={true}
                                width={210}
                                height={31}
                                type="number"
                                name="count"
                                min="0"
                                value={mainProperties.count}
                                required={true}
                                id="input"
                            />
                            <UI.Input
                                onChange={changeMainProperties}
                                className="createproduct-input"
                                placeholder="Price"
                                borderRadius="3px"
                                bgColor="#fff"
                                border={true}
                                width={210}
                                height={31}
                                type="number"
                                name="price"
                                min="0"
                                step="0.01"
                                value={mainProperties.price}
                                required={true}
                                id="input"
                            />
                            <UI.Input
                                onChange={changeMainProperties}
                                className="createproduct-input"
                                placeholder="Discount"
                                borderRadius="3px"
                                bgColor="#fff"
                                border={true}
                                width={210}
                                height={31}
                                type="number"
                                name="discount"
                                min="0"
                                step="0.01"
                                value={mainProperties.discount}
                                required={true}
                                id="input"
                            />
                            <UI.Dropdown
                                onChange={changeMainProperties}
                                className="createproduct-input"
                                value={mainProperties.currency}
                                options={[{ value: "USD" }, { value: "RUB" }]}
                                borderRadius="3px"
                                borderColor="#f1f1f1"
                                bgColor="#fff"
                                border={true}
                                width={220 + 30}
                                height={40}
                                name="currency"
                                placeholder="Currency"
                                required={true}
                                id="dropdown"
                            />
                        </div>
                        <div className="secondary-attributes">
                            <div className="createproduct-secondtitle">Your Custom Attributes</div>
                            {attributes && attributes.length > 0
                                ? attributes.map((attribute: any, i: number) => (
                                      <>
                                          <AdminInput
                                              key={i}
                                              id={i}
                                              attribute={attribute}
                                              onChangeInputField={onChangeInputField}
                                              val={fields[i]}
                                          />
                                          {errors.length > 0
                                              ? errors.map((error: any, index: number) => {
                                                    return index === i ? <div key={index}>{error}</div> : ""
                                                })
                                              : ""}
                                      </>
                                  ))
                                : ""}
                        </div>
                    </div>
                    <UI.Button
                        borderColor="#eee"
                        border={true}
                        backgroundColor="transparent"
                        content="CREATE"
                        color="#92b967"
                        width="150px"
                        fontSize="13px"
                        customStyleObject={{ alignSelf: "center", marginTop: "20px", marginBottom: "20px" }}
                    />
                </form>
            </div>
            <div className="admin-left-side">
                <div className="admin-title">Info</div>
                <div className="admin-subtitle">Product creation explanation</div>
                <ul>
                    <li className="admin-li">
                        <div className="admin-text">
                            <span className="admin-bold-span">Main Attributes </span>
                        </div>
                        <div className="admin-text">
                            These attributes are common for all product types you will create. They are all required to
                            fill.
                        </div>
                    </li>
                    <li className="admin-li">
                        <div className="admin-text">
                            <span className="admin-bold-span">Custom Attributes</span>
                        </div>
                        <div className="admin-text">
                            In that section of inputs will be placed all atttributes you created in the &#34;Edit
                            Attributes&#34; section. Those that you marked as required will be with *. Enums will be
                            displayed as select element with options
                        </div>
                    </li>
                </ul>
            </div>
        </AdminMainContent>
    )
}
