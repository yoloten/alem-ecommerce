import React, { useState } from "react"
import Router from "next/router"
import axios from "axios"

import Button from "../UI/Button"

export default function Register(props: any) {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const register = async (e: any) => {
        e.preventDefault()

        if (password.length < 8) {
            console.log("Пароль должен состоять из 8 и более символов")
        } else {
            try {
                await axios.post("http://localhost:8000/api/user/register", { email, name, password })

                Router.push("/")
            } catch (error) {
                console.log(error)
            }
        }
    }

    const passwordChange = (e: any) => setPassword(e.target.value)

    const emailChange = (e: any) => setEmail(e.target.value)

    const nameChange = (e: any) => setName(e.target.value)

    return (
        <>
            <div className="register">
                <div className="main">
                    <div className="title">Create an account</div>
                    <div className="sub-title">Please fill all forms</div>
                    <form onSubmit={register} action="submit" className="inputs">
                        <input onChange={emailChange} className="input" placeholder="Email" type="email" />
                        <input onChange={nameChange} className="input" placeholder="Full Name" type="text" />
                        <input onChange={passwordChange} className="input" placeholder="Password" type="password" />
                        <Button
                            content="Sign In"
                            color="#fff"
                            backgroundColor="#ff7070"
                            borderRadius="30px"
                            height="50px"
                            width="432px"
                            type="submit"
                            customStyleObject={{ marginTop: "40px" }}
                        />
                    </form>
                </div>
            </div>
            <style jsx>{`
                .register{
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
                    text-align: center
                }
                .sub-title{
                    color: gray;
                    text-align: center
                }
                .input{
                    width: 400px;
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
