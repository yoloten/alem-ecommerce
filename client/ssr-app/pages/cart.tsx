import nextCookie from "next-cookies"
import dynamic from "next/dynamic"

const Cart = dynamic(() => import("../components/Cart"), {
    ssr: false,
})

function cart({ token }: any) {
    return <Cart token={token} />
}

cart.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default cart
