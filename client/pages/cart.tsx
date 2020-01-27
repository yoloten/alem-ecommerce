import dynamic from "next/dynamic"

const Cart = dynamic(() => import("../components/Cart"), {
    ssr: false,
})


function cart() {
    return <Cart />
}

export default cart
