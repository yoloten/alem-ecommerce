import { withAuthSync } from "../utils/auth"
import nextCookie from "next-cookies"
import dynamic from "next/dynamic"
import jwtDecode from "jwt-decode"

import Navbar from "../components/Common/Navbar"
import Login from "../components/Auth/Login"

const Address = dynamic(() => import("../components/Address"), {
    ssr: false,
})

function address({ token }: any) {

    const showAddress = () => {
        if (token) {
            const decoded: any = jwtDecode(token)
            const current = Date.now() / 1000

            if (decoded.exp < current) {
                return <Login />
            } else {
                return <Address decoded={decoded} token={token}/>
            }
        } else {
            return <Login toAddress={true} />
        }
    }

    return (
        <>
            <Navbar />
            <div className="main">
                {showAddress()}
            </div>
            <style jsx>{`
                .main{
                    margin-top: 20px;
                    border-top: 1px solid #d9d9d9;
                    padding-top: 40px
                }
            `}</style>
        </>
    )
}

address.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default address
