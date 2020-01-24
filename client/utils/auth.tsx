import { useEffect } from "react"
import Router from "next/router"
import nextCookie from "next-cookies"
import cookie from "js-cookie"
import jwtDecode from "jwt-decode"

export const login = (token: any) => {
    cookie.set("token", token)
    Router.push("/")
}

export const auth = (ctx: any) => {
    const { token }: any = nextCookie(ctx)
    const decoded: any = jwtDecode(token)
    const current = Date.now() / 1000
    // If there's no token, it means the user is not logged in.
    if (decoded.exp < current) {
        if (typeof window === "undefined") {
            ctx.res.writeHead(302, { Location: "/auth" })
            ctx.res.end()
        } else {
            Router.push("/auth")
        }
    }

    return token
}

export const logout = () => {
    cookie.remove("token")
    // to support logging out from all windows
    window.localStorage.setItem("logout", Date.now().toString())
    Router.push("/login")
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

        return <WrappedComponent { ...props } />
  }

    Wrapper.getInitialProps = async (ctx: any) => {
        const token = auth(ctx)

        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx))

        return { ...componentProps, token }
    }

    return Wrapper
}
