import React, { useEffect } from "react"
import nextCookie from "next-cookies"
import jwtDecode from "jwt-decode"
import Router from "next/router"
import cookie from "js-cookie"

export const login = (jwt: any) => {
    cookie.set("token", jwt)
}

export const auth = (ctx: any) => {
    const { token }: any = nextCookie(ctx)

    if (token) {
        const decoded: any = jwtDecode(token)
        const current = Date.now() / 1000
        // If there's no token, it means the user is not logged in.

        if (decoded.exp < current) {
            if (typeof window === "undefined") {
                ctx.res.writeHead(302, { Location: "/" })
                ctx.res.end()
            } else {
                Router.push("/")
            }
        }
    } else {
        if (typeof window === "undefined") {
            ctx.res.writeHead(302, { Location: "/" })
            ctx.res.end()
        } else {
            Router.push("/")
        }
    }

    return token
}

export const logout = () => {
    cookie.remove("token")
    // to support logging out from all windows
    window.localStorage.setItem("logout", Date.now().toString())
    Router.push("/")
}

export const withAuthSync = (WrappedComponent: any) => {
    const Wrapper = (props: any) => {
        const syncLogout = (event: any) => {
            if (event.key === "logout") {
                console.log("logged out from storage!")
                Router.push("/auth")
            }
        }

        useEffect(() => {
            window.addEventListener("storage", syncLogout)

            return () => {
                window.removeEventListener("storage", syncLogout)
                window.localStorage.removeItem("logout")
            }
        }, [])

        return <WrappedComponent {...props} />
    }

    Wrapper.getInitialProps = async (ctx: any) => {
        const token = auth(ctx)

        const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

        return { ...componentProps, token }
    }

    return Wrapper
}
