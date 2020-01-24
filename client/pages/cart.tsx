import dynamic from "next/dynamic"
import React from "react"

const Cart = dynamic(() => import("../components/Cart"), {
    ssr: false,
})

function cart() {
    return (
        <Cart />
    )
}
export default cart
