import { deleteMsg, setMsg } from "reducers/user/userReducer"
import { useDispatch, useSelector } from "react-redux"
import { createOrUpdateCart } from "actions/user/cart"
import React, { useState, useEffect } from "react"
import { navigation } from "containers/Navigation"
import { login } from "actions/user/auth"
import { RootState } from "reducers"

import * as Icons from "../../../../common-components/icons"
import * as UI from "../../../../common-components/src"
import Navbar from "components/Navbar"

export default function Login(): JSX.Element {
    const [state, setState] = useState({
        password: "",
        email: "",
    })

    const { msg, user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(deleteMsg())
        }, 3000)
    }, [msg])

    useEffect(() => {
        if (user.role === "customer") {
            if (process.env.NODE_ENV === "development") {
                window.location.href = `http://localhost:3000?data=${localStorage.getItem("jwtToken")}`
            } else {
                navigation.navigate("/")
            }
        }
        if (user.role === "admin" || user.role === "superadmin") {
            navigation.navigate("/admin/product/list")
        }
    }, [user])

    const inputChange = (e: any) => {
        e.persist()
        setState((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const openLogin = async (e: any) => {
        e.preventDefault()

        const storageData = Object.keys(localStorage).map((key: string) => {
            if (key.slice(0, 13) === "product_item_") {
                const data: any = localStorage.getItem(key)
                const parsed = JSON.parse(data)
                parsed.key = key

                return parsed
            }
        })

        dispatch(login(state))
        // dispatch(createOrUpdateCart(storageData))
        // if (localStorage.getItem("jwtToken")) {
        //     navigation.navigate("/admin/product/list")
        // }
        // const res = await axios.post("http://localhost:8000/api/user/login", { email, password })
        // const token = res.data.token

        // login(token, props.toAddress)
    }

    return (
        <>
            <Navbar />
            <div className="auth">
                <div className="title">Sign in</div>
                <div className="sub-title">Please fill all forms</div>
                <form onSubmit={openLogin} action="submit" className="auth-inputs">
                    <UI.Input
                        name="email"
                        id="input"
                        width={220}
                        type="email"
                        onChange={inputChange}
                        placeholder="Email"
                    />
                    <UI.Input
                        name="password"
                        id="input"
                        width={220}
                        type="password"
                        onChange={inputChange}
                        placeholder="Password"
                    />
                    <UI.Button
                        content="Sign In"
                        color="#fff"
                        backgroundColor="#ff7070"
                        borderRadius="30px"
                        height="50px"
                        width="302px"
                        customStyleObject={{ marginTop: "40px" }}
                    />
                </form>
                <div className="msg">{msg}</div>
            </div>
        </>
    )
}
