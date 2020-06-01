import nextCookie from "next-cookies"
import dynamic from "next/dynamic"

const CreateProduct = dynamic(() => import("../../components/Admin/CreateProduct"), {
    ssr: false,
})

function editproduct({ token }: any) {
    return <CreateProduct />
}

editproduct.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default editproduct
