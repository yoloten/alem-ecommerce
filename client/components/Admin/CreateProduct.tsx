import React, { useEffect, useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"

import { setInputWidth } from "../../utils/setInputWidth"
import AdminMainContent from "./AdminUI/AdminMainContent"
import AdminSidebar from "./AdminUI/AdminSidebar"
import AdminNav from "./AdminUI/AdminNav"
import AdminInput from "./AdminInput"
import Dropdown from "../UI/Dropdown"
import Button from "../UI/Button"
import Input from "../UI/Input"

export default function CreateProduct() {
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

    useEffect(() => {
        const getDataFromServer = async () => {
            const newSchema = await axios.get("http://localhost:8000/api/product/schema", {
                params: { table: "product" },
            })
            const getCategory = await axios.get("http://localhost:8000/api/category/last")

            if (newSchema.data && newSchema.data.attributes.length > 0) {
                setAttributes(newSchema.data.attributes)

                const arr = []
                const errArr = []

                for (let i = 0; i < newSchema.data.attributes.length; i++) {
                    arr.push({})
                    errArr.push("")
                }

                setFields(arr)
                setErrors(errArr)
            }
            if (getCategory.data && getCategory.data.length > 0) {
                setCategries(getCategory.data)
            }
        }

        getDataFromServer()
    }, [])

    const deletePhoto = (index: number) => {
        const newPhotos = [...photos]
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
            const arr = [...[newFields[parseInt(id, 10)][name]]]

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

        const created = await axios.post("http://localhost:8000/api/product/create", { table: "product" })

        if (created.data.success) {
            await axios.post("http://localhost:8000/api/product/insert", formData)
        }
    }

    return (
        <AdminMainContent>
            <div className="admin-title">Create Product</div>
            <div className="admin-subtitle">
                On this page you can create a product from properties you defined
                    </div>

            <form className="admin-form createproduct-flex" action="submit" onSubmit={submit}>
                <div className="createproduct-attributes">
                    <div className="main-attributes">
                        <div className="createproduct-secondtitle">Main Attributes</div>
                        <Input
                            className="createproduct-input"
                            onChange={changeMainProperties}
                            placeholder="Name"
                            borderRadius="6px"
                            bgColor="#f3f3f3"
                            border={false}
                            width={200}
                            height="31"
                            type="text"
                            name="name"
                            value={mainProperties.name}
                            required={true}
                        />
                        <Input
                            className="createproduct-input"
                            onChange={changeMainProperties}
                            placeholder="Count"
                            borderRadius="6px"
                            bgColor="#f3f3f3"
                            border={false}
                            width={190}
                            height="31"
                            type="number"
                            name="count"
                            min="0"
                            value={mainProperties.count}
                            required={true}
                        />
                        <div className="createproduct-price" style={{ width: 100 * 3.5 }}>
                            <Input
                                className="createproduct-input"
                                onChange={changeMainProperties}
                                placeholder="Price"
                                borderRadius="6px"
                                bgColor="#f3f3f3"
                                border={false}
                                width={65}
                                height="31"
                                type="number"
                                name="price"
                                min="0"
                                step="0.01"
                                value={mainProperties.price}
                                required={true}
                            />
                            <Input
                                className="createproduct-input"
                                onChange={changeMainProperties}
                                placeholder="Discount"
                                borderRadius="6px"
                                bgColor="#f3f3f3"
                                border={false}
                                width={65}
                                height="31"
                                type="number"
                                name="discount"
                                min="0"
                                max="1"
                                step="0.01"
                                value={mainProperties.discount}
                                required={true}
                            />
                            <Dropdown
                                onChange={changeMainProperties}
                                className="createproduct-input"
                                value={mainProperties.currency}
                                options={[{ value: "USD" }, { value: "RUB" }]}
                                borderRadius="6px"
                                bgColor="#f3f3f3"
                                border={false}
                                width={65 + 30}
                                height="40"
                                name="currency"
                                placeholder="Currency"
                                required={true}
                            />
                        </div>

                        <Input
                            className="createproduct-input"
                            onChange={changeMainProperties}
                            placeholder="Description"
                            borderRadius="6px"
                            bgColor="#f3f3f3"
                            border={false}
                            width={200}
                            height="31"
                            type="text"
                            name="description"
                            value={mainProperties.description}
                            required={true}
                        />
                        <select required name="category" onChange={changeMainProperties} id="">
                            <option selected disabled>Choose Category</option>
                            {categories.map((item: any) => {
                                return <option value={item.uuid}>{item.name}</option>
                            })}
                        </select>
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            {isDragAccept && (<p>All photos will be accepted</p>)}
                            {isDragReject && (<p>Some photos will be rejected</p>)}
                            {!isDragActive && (<p>Drop some photos here(maximum 8) ...</p>)}
                        </div>
                        {photos.flat().map((file: any, index: number) => {
                            return <div className="craeteproduct-photos">
                                <img height="50" width="50" src={URL.createObjectURL(file)} alt="" />
                                <div className="delete" id={index.toString()} onClick={() => deletePhoto(index)}>
                                    delete
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="secondary-attributes">
                        <div className="createproduct-secondtitle">Secondary Attributes</div>
                        {attributes && attributes.length > 0
                            ? attributes.map((attribute: any, i: number) => (
                                <>
                                    <AdminInput
                                        key={i}
                                        id={i}
                                        attribute={attribute}
                                        onChangeInputField={onChangeInputField}
                                    />
                                    {errors.length > 0 ? errors.map((error: any, index: number) => {
                                        return index === i ? <div key={index}>{error}</div> : ""
                                    }) : ""}
                                </>
                            ))
                            : ""
                        }
                    </div>
                </div>
                <button disabled={disabledBtn} style={{ alignSelf: "center", marginTop: "40px" }} >Create</button>
            </form>
        </AdminMainContent>
    )
}
