import nextCookie from "next-cookies"
import dynamic from "next/dynamic"
import jwtDecode from "jwt-decode"
import { useState, useEffect } from "react"
import Router from "next/router"
import Link from "next/link"

import Navbar from "../components/Common/Navbar"

const Login = dynamic(() => import("../components/Auth/Login"), {
    ssr: false,
})
const Register = dynamic(() => import("../components/Auth/Register"), {
    ssr: false,
})

function auth() {
    const [state, setState] = useState(false)

    const onChangeState = () => setState(!state)

    return (
        <>
            <Navbar />
            <div className="main">
                <Link href="/">
                    <a className="back">Back to store</a>
                </Link>
                {!state ? <Login marginTop="40px" /> : <Register marginTop="40px" />}
                <div onClick={onChangeState} className="isauth">
                    {!state ? "Not a member yet? Sign up" : "Have an account? Sign in"}
                </div>
            </div>
            <style jsx>{`
                .main{
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

auth.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)
    
    if (token) {
        const decoded: any = jwtDecode(token)
        const current = Date.now() / 1000

        if (decoded.exp < current) {
            console.log("login")
        } else {
            if (ctx.req) {
                ctx.res.writeHead(302, { Location: "/" })
                ctx.res.end()
            } else {
                Router.push("/")
            }
        }

        if (ctx.req) {
            ctx.res.writeHead(302, { Location: "/" })
            ctx.res.end()
        } else {
            Router.push("/")
        }
    }

    return {}
}

export default auth
