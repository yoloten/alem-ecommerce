import * as Icons from "../../public/icons/_compiled"
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
            // parsed.price = parsed.price / parsed.quantity
            parsed.quantity = parsed.quantity - 1

            sessionStorage.setItem(e.target.id, JSON.stringify(parsed))
            setAmount(amount - 1)
        }
    }

    const incrementAmount = (e: any) => {
        const item: any = sessionStorage.getItem(e.target.id)
        const parsed = JSON.parse(item)
        parsed.quantity = parsed.quantity + 1
        // parsed.price = parsed.price * parsed.quantity

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
            <div className="main">
                <div className="header">
                    <div className="title">Shopping Cart</div>
                    <Progress status="cart" />
                </div>
                <div className="table">
                    <div className="table-titles">
                        <div className="table-title title-product">Product</div>
                        <div className="table-title title-color">Color</div>
                        <div className="table-title title-color">Size</div>
                        <div className="table-title title-color">Amount</div>
                        <div className="table-title title-color">Price</div>
                        <div className="table-title title-remove"></div>
                    </div>
                    <div className="table-content">
                        {sessionData.map((product: any, i: number) => {
                            if (product) {
                                const price = parseFloat(product.price)
                                const discount = parseFloat(product.discount)
                                const quantity = parseFloat(product.quantity)

                                return <div key={i} className="product">
                                    <div className="name">
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
                                    <div className="color">{product.color}</div>
                                    <div className="color">{product.size.toUpperCase()}</div>
                                    <div className="quantity-box">
                                        <div className="remove" id={product.key} onClick={decrementAmount}>-</div>
                                        <div className="number">{product.quantity}</div>
                                        <div className="remove" onClick={incrementAmount} id={product.key}>+</div>
                                    </div>
                                    <div className="color price">
                                        {discount
                                            ? ((price - price * discount) * quantity).toFixed(2)
                                            : (price * quantity).toFixed(2)
                                        }
                                        {product.currency}
                                    </div>
                                    <div onClick={removeItem} id={product.key} className="color-remove">x</div>
                                </div>
                            }
                        })}
                    </div>
                    <div className="actions">
                        <div className="continue" onClick={() => Router.back()}>Continue Shopping</div>
                        <div className="total-checkout">
                            <div className="total">
                                <div>Total:</div>
                                <div className="total-price">{total.toFixed(2) + totalCurrency}</div>
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
            <style jsx>{`
                .main{
                    border-top: 1px solid #d9d9d9;
                }
                .table{
                    margin-left: 170px;
                    margin-right: 170px;
                }
                .header{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 40px;
                    margin-left: 170px;
                    margin-right: 170px;
                }
                .title{
                    font-family: 'PoppinsSemiBold', serif;
                    font-size: 20px;
                }
                .icon{
                    background: #ff7070;
                    min-height: 30px;
                    min-width: 30px;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center
                }
                .table-titles{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 40px;
                    color: gray
                }
                .product{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }
                .name{
                    display: flex;
                    align-items: center;
                    width: 300px;
                    font-family: 'PoppinsSemiBold', serif;
                }
                .title-product{
                    width: 300px
                }
                .title-color{
                    width: 140px;
                    display: flex;
                    justify-content: center;
                }
                .title-remove{
                    width: 40px;
                    display: flex;
                    justify-content: center;
                }
                .color-remove{
                    width: 40px; 
                    display: flex;
                    align-items: center;
                    height: 50px;
                    justify-content: center;
                    cursor: pointer;
                }
                .color{
                    width: 140px; 
                    display: flex;
                    align-items: center;
                    height: 50px;
                    justify-content: center;
                }
                .quantity-box{
                    display: flex;
                    justify-content: space-around;
                    width: 140px;
                    height: 50px;
                    border: 1px solid #d9d9d9;
                    border-radius: 30px;
                    align-items: center;
                    font-family: 'PoppinsSemiBold', serif;
                }
                .remove{
                    cursor: pointer;
                    user-select: none;
                }
                .price{
                    font-family: 'PoppinsSemiBold', serif;
                }
                .actions{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 60px;
                }
                .continue{
                    text-decoration: none;
                    color: #000;
                    cursor: pointer
                }
                .total-checkout{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 350px;
                }
                .total{
                    display: flex
                }
                .total-price{
                    margin-left: 5px;
                    font-family: 'PoppinsSemiBold', serif;
                }
                @media (max-width: 1200px) {
                    .table{
                        margin-left: 60px;
                        margin-right: 60px;
                    }
                    .header{
                        margin-left: 60px;
                        margin-right: 60px;
                    }
                }
                @media (max-width: 1000px) {
                    .table{
                        margin-left: 30px;
                        margin-right: 30px;
                        font-size: 14px
                    }
                    .header{
                        margin-left: 30px;
                        margin-right: 30px;
                    }
                    .quantity-box{
                        width: 120px;
                        height: 50px;
                    }
                }
                @media (max-width: 700px) {
                    .table{
                        margin-left: 15px;
                        margin-right: 15px;
                        font-size: 12px
                    }
                    .header{
                        margin-left: 15px;
                        margin-right: 15px;
                    }
                    .name{
                        width: 200px;
                    }
                    .title-product{
                        min-width: 70px
                    }
                    .quantity-box{
                        margin-right: 5px
                    }
                }
                @media (max-width: 450px) {
                    .header{
                        display: flex;
                        flex-direction: column;
                    }
                    .title {
                        margin-bottom: 10px
                    }
                    .actions{
                        display: flex;
                        flex-direction: column-reverse;
                        align-items: flex-start
                    }
                    .total-checkout{
                        width: 100%;
                    }
                }
                @media (max-width: 370px) {
                    .table{
                        margin-left: 5px;
                        margin-right: 5px;
                        font-size: 11px
                    }
                    .header{
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                }
            `}</style>
        </div>
    )
}
