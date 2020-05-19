import nextCookie from "next-cookies"
import dynamic from "next/dynamic"

const CreateCategory = dynamic(() => import("../../components/Admin/CreateCategory"), {
    ssr: false,
})

function createcategory({ token }: any) {
    return <CreateCategory
        // token={token}
    />
}

createcategory.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default createcategory

