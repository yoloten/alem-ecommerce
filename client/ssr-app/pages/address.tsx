import { withAuthSync } from "../utils/auth"
import nextCookie from "next-cookies"
import dynamic from "next/dynamic"
import jwtDecode from "jwt-decode"
import React from "react"

import Navbar from "../components/Common/Navbar"
import Login from "../components/Auth/Login"

const Address = dynamic(() => import("../components/Address"), {
    ssr: false,
})

function address(props: any) {
    const showAddress = () => {
        if (props.login) {
            return <Login />
        }
        if (props.address) {
            return <Address decoded={props.decoded} token={props.token} />
        }
        if (props.loginToAddress) {
            return <Login toAddress={true} />
        }
    }

    return (
        <>
            <Navbar />
            <div className="main">{showAddress()}</div>
            <style jsx>{`
                .main {
                    margin-top: 20px;
                    border-top: 1px solid #d9d9d9;
                    padding-top: 40px;
                }
            `}</style>
        </>
    )
}

address.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    if (token) {
        const decoded: any = jwtDecode(token)
        const current = Date.now() / 1000

        if (decoded.exp < current) {
            return { login: "login" }
        } else {
            if (ctx.req) {
                ctx.res.writeHead(302, { Location: "/" })
                ctx.res.end()
            } else {
                return {
                    address: "address",
                    decoded,
                    token,
                }
            }
        }
    } else {
        return { loginToAddress: "loginToAddress" }
    }
}

export default address
