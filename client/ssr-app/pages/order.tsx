import nextCookie from "next-cookies"
import dynamic from "next/dynamic"
import { withAuthSync } from "../utils/auth"

import Navbar from "../components/Common/Navbar"

const Order = dynamic(() => import("../components/Order"), {
    ssr: false,
})

function order({token}: any) {
    return (
        <>
            <Navbar />
            <div className="order">
                <Order token={token}/>
            </div>
            <style jsx>{`
                .order{
                    border-top: 1px solid #d9d9d9;
                    padding-top: 40px
                }
            `}</style>
        </>
    )
}

order.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default withAuthSync(order)