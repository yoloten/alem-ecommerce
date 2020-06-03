import React, { useState } from "react"
import axios from "axios"
import { login } from "../../utils/auth"

import Button from "../UI/Button"

export default function Login(props: any) {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    const emailChange = (e: any) => setEmail(e.target.value)

    const passwordChange = (e: any) => setPassword(e.target.value)

    const openLogin = async (e: any) => {
        e.preventDefault()

        const sessionData = Object.keys(sessionStorage).map((key: string) => {
            if (key !== "id" && key !== "deliveryPrimaryKey") {
                const data: any = sessionStorage.getItem(key)
                const parsed = JSON.parse(data)
                parsed.key = key

                return parsed
            }
        })

        const res = await axios.post("http://localhost:8000/api/user/login", { email, password })
        const token = res.data.token

        await axios.post("http://localhost:8000/api/order/createcart", {
            cartItems: sessionData.filter((i) => i !== undefined),
            id: sessionStorage.getItem("id"),
        },
            {
                headers: { "Authorization": token }
            }
        )

        login(token, props.toAddress)
    }
    
    return (
        <>
            <div className="login">
                <div className="title">Sign in</div>
                <div className="sub-title">Please fill all forms</div>
                <form onSubmit={openLogin} action="submit" className="inputs">
                    <input className="input" type="email" onChange={emailChange} placeholder="Email" />
                    <input className="input" type="password" onChange={passwordChange} placeholder="Password" />
                    <Button
                        content="Sign In"
                        color="#fff"
                        backgroundColor="#ff7070"
                        borderRadius="30px"
                        height="50px"
                        width="302px"
                        type="submit"
                        customStyleObject={{ marginTop: "40px" }}
                    />
                </form>
            </div>
            <style jsx>{`
            .login{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin-top: ${props.marginTop ? props.marginTop : "0px"}
            }
            .inputs{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 30px
            }
            .title{
                font-family: SegoeUIBold, serif;
                font-size: 20px;
            }
            .sub-title{
                color: gray;
                text-align: center
            }
            .input{
                width: 270px;
                height: 50px;
                border-radius: 30px;
                border: 1px solid #d9d9d9;
                padding-left: 32px;
                margin-top: 10px;
            }
        `}</style>
        </>
    )
}
