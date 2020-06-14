import { navigation } from "containers/Navigation"
import React, { useState, useEffect } from "react"
import { useCurrentRoute } from "react-navi"
import jwtDecode from "jwt-decode"
import { v4 } from "uuid"
import axios from "axios"
// import Progress from "../UI/Progress"

import Navbar from "../components/Navbar"
import * as UI from "../../../common-components/src"

export default function index(): JSX.Element {
    const [storageData, setStorageData]: any = useState([])
    const [amount, setAmount]: any = useState(1)
    const [total, setTotal]: any = useState(0)
    const [totalCurrency, setTotalCurrency]: any = useState("USD")
    const [forNavbar, setForNavbar]: any = useState("")

    const route = useCurrentRoute()

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            const { data } = route.url.query
            let parsedData: any = { no: "data" }

            if (data) {
                parsedData = JSON.parse(data)
            } else {
                parsedData = localStorage
            }

            setStorageData(
                Object.keys(parsedData)
                    .map((key) => {
                        const item = localStorage.getItem(key)

                        if (!item && key.slice(0, 13) === "product_item_") {
                            const parsedProduct = JSON.parse(parsedData[key])
                            parsedProduct.key = key

                            localStorage.setItem(key, parsedData[key])

                            return parsedProduct
                        }
                        if (item && key.slice(0, 13) === "product_item_") {
                            const parsedProduct = JSON.parse(parsedData[key])
                            parsedProduct.key = key

                            return parsedProduct
                        }
                    })
                    .filter(Boolean),
            )
        } else {
            setStorageData(
                Object.keys(localStorage)
                    .map((key) => {
                        const item = localStorage.getItem(key)

                        if (item && key.slice(0, 13) === "product_item_") {
                            const parsedProduct = JSON.parse(item)
                            parsedProduct.key = key

                            return parsedProduct
                        }
                    })
                    .filter(Boolean),
            )
        }
    }, [amount])

    useEffect(() => {
        const createOrUpdateCart = async () => {
            // if (sessionData.length > 0) {
            //     if (props.token) {
            //         const decoded: any = jwtDecode(props.token)
            //         const current = Date.now() / 1000
            //         if (decoded.exp >= current) {
            //             await axios.post("http://localhost:8000/api/order/createcart", {
            //                 cartItems: sessionData.filter((i: any) => i !== undefined),
            //                 id: sessionStorage.getItem("id"),
            //             },
            //                 {
            //                     headers: { "Authorization": props.token }
            //                 }
            //             )
            //         }
            //     }
            // }
        }

        createOrUpdateCart()
        const totalPrice: number[] = []

        if (storageData && storageData.length > 0) {
            for (let i = 0; i < storageData.length; i++) {
                if (storageData[i]) {
                    const price = parseFloat(storageData[i].price)
                    const discount = parseFloat(storageData[i].discount)
                    const quantity = parseFloat(storageData[i].quantity)

                    totalPrice.push(discount ? (price - price * discount) * quantity : price * quantity)
                }
            }

            if (totalPrice.length > 0) {
                const reduced = totalPrice.reduce((acc: number, curr: number) => acc + curr)

                setTotal(reduced)
            }
        }
    }, [storageData])

    const removeItem = (e: any) => {
        sessionStorage.removeItem(e.target.id)
        setAmount(amount - 1)
        setForNavbar(v4())
    }

    const nextStep = () => navigation.navigate("/address")

    return (
        <div>
            <Navbar removeData={forNavbar} />
            <div className="cart-main">
                <div className="cart-header">
                    <div className="cart-title">Shopping Cart</div>
                    {/* <Progress status="cart" /> */}
                </div>
                <div className="table">
                    <div className="table-titles">
                        <div className="table-title-name">Product</div>
                        {storageData &&
                            storageData.length > 0 &&
                            Object.keys(storageData[0])
                                .sort()
                                .map((key) => {
                                    const changedKey = key.slice(-5) === "_enum" ? key.slice(0, -5) : key
                                    if (key !== "photo" && key !== "name" && key !== "key") {
                                        return (
                                            <div key={key} className="table-title-attribute">
                                                {changedKey}
                                            </div>
                                        )
                                    }
                                })}

                        <div className="table-title-remove"></div>
                    </div>
                    <div className="table-content">
                        {storageData &&
                            storageData.length > 0 &&
                            storageData.map((product: any, i: number) => {
                                if (product) {
                                    const price = parseFloat(product.price)
                                    const discount = parseFloat(product.discount)
                                    const quantity = parseFloat(product.quantity)
                                    return (
                                        <div className="table-product">
                                            <div className="table-product-name">
                                                <div
                                                    style={{
                                                        backgroundImage:
                                                            "url(" + "http://localhost:8000/" + product.photo + ")",
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
                                            {Object.keys(product)
                                                .sort()
                                                .map((key) => {
                                                    if (key !== "photo" && key !== "name" && key !== "key") {
                                                        return (
                                                            <div className="table-product">
                                                                <div className="table-product-attribute">
                                                                    {product[key]}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            <div onClick={removeItem} id={product.key} className="cart-color-remove">
                                                x
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                    </div>
                    <div className="cart-actions">
                        <div className="cart-continue" onClick={() => navigation.goBack()}>
                            Continue Shopping
                        </div>
                        <div className="cart-total-checkout">
                            <div className="cart-total">
                                <div>Total:</div>
                                <div className="cart-total-price">{total.toFixed(2) + totalCurrency}</div>
                            </div>
                            {storageData &&
                            storageData.length > 0 &&
                            storageData.filter((i: any) => i !== undefined).length > 0 ? (
                                <UI.Button
                                    content="CHECKOUT"
                                    color="#fff"
                                    backgroundColor="#ff7070"
                                    borderRadius="30px"
                                    height="50px"
                                    width="180px"
                                    className="toAddress"
                                    onClick={nextStep}
                                />
                            ) : (
                                "Cart is empty"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
