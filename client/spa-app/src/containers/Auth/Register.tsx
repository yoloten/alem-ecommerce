import { deleteMsg, setMsg } from "reducers/user/userReducer"
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import { navigation } from "containers/Navigation"
import { register } from "actions/user/auth"
import { useDropzone } from "react-dropzone"
import { RootState } from "reducers"

import * as Icons from "../../../../common-components/icons"
import * as UI from "../../../../common-components/src"

export default function Register(): JSX.Element {
    const [photo, setPhoto] = useState("")
    const [state, setState] = useState({
        password: "",
        email: "",
        name: "",
    })
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop: (acceptedFiles: any) => {
            setPhoto(acceptedFiles[0])
        },
    })

    const { msg } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(deleteMsg())
        }, 3000)
    }, [msg])

    const inputChange = (e: any) => {
        e.persist()
        setState((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const deletePhoto = () => setPhoto("")

    const submit = (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("fields", JSON.stringify(state))

        if (state.password.length < 6) {
            dispatch(setMsg("Password must be at least 6 characters"))
        } else {
            dispatch(register(formData))
            navigation.navigate("/auth/login")
        }
    }

    return (
        <div className="auth">
            <div className="auth-main">
                <div className="title">Create an account</div>
                <div className="sub-title">Please fill all forms</div>
                <form action="submit" className="auth-inputs" onSubmit={submit}>
                    <div className="createproduct-dropzone-photolist">
                        <div className="photos-list">
                            {!photo ? (
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <Icons.AddImage />
                                </div>
                            ) : (
                                <div className="craeteproduct-photos">
                                    <img
                                        className="createproduct-img"
                                        height="80"
                                        width="80"
                                        src={URL.createObjectURL(photo)}
                                        alt=""
                                    />
                                    <div className="photo-delete" onClick={deletePhoto}>
                                        <Icons.Trash style={{ zIndex: "-1", position: "relative" }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <UI.Input
                        width={200}
                        name="email"
                        id="email"
                        onChange={inputChange}
                        placeholder="Email"
                        type="email"
                        border={true}
                        required={true}
                    />
                    <UI.Input
                        width={200}
                        name="name"
                        id="name"
                        onChange={inputChange}
                        placeholder="Full Name"
                        type="text"
                        border={true}
                        required={true}
                    />
                    <UI.Input
                        width={200}
                        name="password"
                        id="password"
                        onChange={inputChange}
                        placeholder="Password (min 6 characters)"
                        type="password"
                        border={true}
                        required={true}
                    />
                    <UI.Button
                        content="Sign In"
                        color="#fff"
                        backgroundColor="#ff7070"
                        borderRadius="30px"
                        height="50px"
                        width="432px"
                        customStyleObject={{ marginTop: "40px" }}
                    />
                </form>
                <div className="error">{msg}</div>
            </div>
        </div>
    )
}
