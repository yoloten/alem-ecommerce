import React, { useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import Router from "next/router"
import { v4 } from "uuid"
import axios from "axios"

import Progress from "../UI/Progress"
import Navbar from "../Common/Navbar"
import Button from "../UI/Button"

export default function index(props: any) {
    const [sessionData, setSessionData] = useState(
        Object.keys(sessionStorage).map((key: string) => {
            if (key !== "id" && key !== "deliveryPrimaryKey") {
                const data: any = sessionStorage.getItem(key)
                const parsed = JSON.parse(data)
                parsed.key = key

                return parsed
            }
        }))
    const [amount, setAmount]: any = useState(1)
    const [total, setTotal]: any = useState(0)
    const [totalCurrency, setTotalCurrency]: any = useState("USD")
    const [forNavbar, setForNavbar]: any = useState("")

    useEffect(() => {
        setSessionData(Object.keys(sessionStorage).map((key: string) => {
            if (key !== "id" && key !== "deliveryPrimaryKey") {
                const data: any = sessionStorage.getItem(key)
                const parsed = JSON.parse(data)
                parsed.key = key

                return parsed
            }
        }))

    }, [amount])

    useEffect(() => {
        const createOrUpdateCart = async () => {
            if (sessionData.length > 0) {
                if (props.token) {
                    const decoded: any = jwtDecode(props.token)
                    const current = Date.now() / 1000

                    if (decoded.exp >= current) {
                        await axios.post("http://localhost:8000/api/order/createcart", {
                            cartItems: sessionData.filter((i) => i !== undefined),
                            id: sessionStorage.getItem("id"),
                        },
                            {
                                headers: { "Authorization": props.token }
                            }
                        )
                    }
                }
            }
        }

        createOrUpdateCart()
        const totalPrice: number[] = []

        for (let i = 0; i < sessionData.length; i++) {
            if (sessionData[i]) {
                const price = parseFloat(sessionData[i].price)
                const discount = parseFloat(sessionData[i].discount)
                const quantity = parseFloat(sessionData[i].quantity)

                totalPrice.push(discount ? ((price - price * discount) * quantity) : price * quantity)
            }
        }

        if (totalPrice.length > 0) {
            const reduced = totalPrice.reduce((acc: number, curr: number) => acc + curr)

            setTotal(reduced)
        }
    }, [sessionData])

    const decrementAmount = (e: any) => {
        const item: any = sessionStorage.getItem(e.target.id)
        const parsed = JSON.parse(item)

        if (parsed.quantity > 1) {
            parsed.quantity = parsed.quantity - 1

            sessionStorage.setItem(e.target.id, JSON.stringify(parsed))
            setAmount(amount - 1)
        }
    }

    const incrementAmount = (e: any) => {
        const item: any = sessionStorage.getItem(e.target.id)
        const parsed = JSON.parse(item)
        parsed.quantity = parsed.quantity + 1

        sessionStorage.setItem(e.target.id, JSON.stringify(parsed))
        setAmount(amount + 1)
    }

    const removeItem = (e: any) => {
        sessionStorage.removeItem(e.target.id)
        setAmount(amount - 1)
        setForNavbar(v4())
    }

    const nextStep = () => Router.push("/address")

    return (
        <div>
            <Navbar removeData={forNavbar}/>
            <div className="cart-main">
                <div className="cart-header">
                    <div className="cart-title">Shopping Cart</div>
                    <Progress status="cart" />
                </div>
                <div className="table">
                    <div className="table-titles">
                        <div className="table-title-product">Product</div>
                        <div className="table-title-attribute">Color</div>
                        <div className="table-title-attribute">Size</div>
                        <div className="table-title-attribute">Amount</div>
                        <div className="table-title-attribute">Price</div>
                        <div className="table-title-remove"></div>
                    </div>
                    <div className="table-content">
                        {sessionData.map((product: any, i: number) => {
                            if (product) {
                                const price = parseFloat(product.price)
                                const discount = parseFloat(product.discount)
                                const quantity = parseFloat(product.quantity)

                                return <div key={i} className="table-product">
                                    <div className="table-product-name">
                                        <div
                                            style={{
                                                backgroundImage: "url(" +
                                                    "http://localhost:8000/" + product.photo
                                                    + ")",
                                                backgroundPosition: "center center",
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                minWidth: "50px",
                                                minHeight: "50px",
                                                borderRadius: "100%",
                                                marginRight: "10px",
                                            }}
                                        />
                                        {product.name}
                                    </div>
                                    <div className="table-product-attribute">{product.color}</div>
                                    <div className="table-product-attribute">{product.size.toUpperCase()}</div>
                                    <div className="table-product-quantity-box">
                                        <div className="cart-remove" id={product.key} onClick={decrementAmount}>-</div>
                                        <div className="cart-number">{product.quantity}</div>
                                        <div className="cart-remove" onClick={incrementAmount} id={product.key}>+</div>
                                    </div>
                                    <div className="cart-color cart-price">
                                        {discount
                                            ? ((price - price * discount) * quantity).toFixed(2)
                                            : (price * quantity).toFixed(2)
                                        }
                                        {product.currency}
                                    </div>
                                    <div onClick={removeItem} id={product.key} className="cart-color-remove">x</div>
                                </div>
                            }
                        })}
                    </div>
                    <div className="cart-actions">
                        <div className="cart-continue" onClick={() => Router.back()}>Continue Shopping</div>
                        <div className="cart-total-checkout">
                            <div className="cart-total">
                                <div>Total:</div>
                                <div className="cart-total-price">{total.toFixed(2) + totalCurrency}</div>
                            </div>
                            {sessionData.filter((i) => i !== undefined).length > 0
                                ? <Button
                                    content="CHECKOUT"
                                    color="#fff"
                                    backgroundColor="#ff7070"
                                    borderRadius="30px"
                                    height="50px"
                                    width="180px"
                                    className="toAddress"
                                    onClick={nextStep}
                                />
                                : "Cart is empty"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
