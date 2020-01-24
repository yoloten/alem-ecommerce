import dynamic from "next/dynamic"
import { useState } from "react"
import Link from "next/link"

import Navbar from "../components/Common/Navbar"

const Login = dynamic(() => import("../components/Auth/Login"), {
    ssr: false,
})
const Register = dynamic(() => import("../components/Auth/Register"), {
    ssr: false,
})

export default function auth() {
    const [state, setState] = useState(false)

    const onChangeState = () => setState(!state)

    return (
        <>
            <Navbar />
            <div className="main">
                <Link href="/">
                    <a className="back">Back to store</a>
                </Link>
                {!state ? <Login marginTop="40px"/> : <Register marginTop="40px"/>}
                <div onClick={onChangeState} className="isauth">
                    {!state ? "Not a member yet? Sign up" : "Have an account? Sign in"}
                </div>
            </div>
            <style jsx>{`
                .main{
                    margin-top: 20px;
                    border-top: 1px solid #d9d9d9;
                    padding-top: 40px;
                }
                .isauth{
                    cursor: pointer;
                    margin-left: 170px;
                    margin-right: 170px;
                    text-align: center;
                    margin-top: 5px
                }
                .back{
                    font-family: SegoeUIBold, serif;
                    text-decoration: none;
                    color: #000;
                    margin-left: 170px;
                    margin-right: 170px;
                }
            `}</style>
        </>
    )
}
