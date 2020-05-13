import nextCookie from "next-cookies"
import dynamic from "next/dynamic"

const CreateProduct = dynamic(() => import("../../components/Admin/CreateProduct"), {
    ssr: false,
})

function createproduct({ token }: any) {
    return <CreateProduct
        // token={token}
    />
}

createproduct.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default createproduct
