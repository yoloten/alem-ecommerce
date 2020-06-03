import nextCookie from "next-cookies"
import dynamic from "next/dynamic"

const ProductsList = dynamic(() => import("../../components/Admin/ProductsList"), {
    ssr: false,
})

function productslist({ token }: any) {
    return <ProductsList
        // token={token}
    />
}

productslist.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default productslist
