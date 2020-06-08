import { getOneById } from "actions/admin/product/product"
import { getLastLevelCategories } from "actions/admin/product/category"
import { getAllAttributes } from "actions/admin/product/attributes"
import { useDispatch, useSelector } from "react-redux"
import { b64toBlob } from "../../../utils/b64ToBlob"
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useCurrentRoute } from "react-navi"
import { redirect } from "navi"
import { RootState } from "reducers"
import axios from "axios"

import * as Icons from "../../../../../common-components/icons"
import * as UI from "../../../../../common-components/src"
import AdminMainContent from "../UI/AdminMainContent"
import AdminInput from "./AdminInput"

export default function CreateProduct(): JSX.Element {
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
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop: (acceptedFiles: any) => {
            setPhotos([...photos, acceptedFiles])
        },
    })
    const route = useCurrentRoute()
    const { pathname, query } = route.url

    const { product, category, attribute } = useSelector((state: RootState) => state)
    const { oneProduct } = product
    const { lastLevelCategories } = category
    const { attributes } = attribute

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLastLevelCategories())
        dispatch(getAllAttributes())

        if (query.id) {
            dispatch(getOneById({ id: query.id }))

            if (oneProduct.photos && oneProduct.photos.length > 0) {
                const photosArr: any = []

                for (let i = 0; i < oneProduct.photos.length; i++) {
                    const content = "image/jpeg"
                    const blob = b64toBlob(oneProduct.photos[i].image, content)
                    const file = new File([blob], oneProduct.photos[i].name, { type: content })

                    photosArr.push(file)
                }

                setPhotos(photosArr)
            }

            if (oneProduct) {
                const newFields = [...fields]

                if (attributes && attributes.length > 0) {
                    attributes.map((attr: any, i: number) => {
                        return Object.keys(oneProduct).map((key: string) => {
                            const obj: any = {}

                            if (key === attr.name + "_name") {
                                obj[attr.name] = oneProduct[attr.name + "_name"]
                                obj.type = attr.type
                                newFields.push(obj)
                            } else if (key === attr.name) {
                                obj[attr.name] = oneProduct[attr.name]
                                obj.type = attr.type
                                newFields.push(obj)
                            }
                        })
                    })
                }

                setFields(newFields)
                setMainProperites((state: any) => ({
                    ...state,
                    ...{
                        name: oneProduct.name,
                        description: oneProduct.description,
                        price: oneProduct.price,
                        count: oneProduct.count,
                        discount: oneProduct.discount,
                        currency: oneProduct.currency,
                        category: oneProduct.category_uuid,
                        id: oneProduct.id,
                    },
                }))
            }
        } else {
            redirect("/admin/product/list")
        }
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
                <div className="admin-title">Edit Product</div>
                <div className="admin-subtitle">On this page you can edit a product from properties you defined</div>
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
                                options={lastLevelCategories}
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
            </div>
        </AdminMainContent>
    )
}
