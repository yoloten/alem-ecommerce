import nextCookie from "next-cookies"
import dynamic from "next/dynamic"

const AdminAttributes = dynamic(() => import("../../components/Admin/AdminAttributes"), {
    ssr: false,
})

function attributes({ token }: any) {
    return <AdminAttributes
        // token={token}
    />
}

attributes.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    return { token }
}

export default attributes
