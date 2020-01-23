import dynamic from "next/dynamic"
import React from "react"

const Cart = dynamic(() => import("../components/Cart"), {
    ssr: false,
  })

export default function cart() {
    return (
        <Cart />
    )
}
