import * as Icons from "../../public/icons/_compiled"
import React, { useState, useEffect } from "react"
import Router from "next/router"
import axios from "axios"

import Navbar from "../Common/Navbar"
import Button from "../UI/Button"

export default function index(props: any) {
    const [sessionData, setSessionData] = useState(
        Object.keys(sessionStorage).map((key: string) => {
            if (key !== "id") {
                const data: any = sessionStorage.getItem(key)
                const parsed = JSON.parse(data)
                parsed.key = key

                return parsed
            }
        }))
    const [amount, setAmount]: any = useState(1)
    const [total, setTotal]: any = useState(0)
    const [totalCurrency, setTotalCurrency]: any = useState("USD")
    const [id]: any = useState(sessionStorage.getItem("id"))

    useEffect(() => {
        setSessionData(Object.keys(sessionStorage).map((key: string) => {
            if (key !== "id") {
                const data: any = sessionStorage.getItem(key)
                const parsed = JSON.parse(data)
                parsed.key = key

                return parsed
            }
        }))

    }, [amount])
    // console.log(id)
    useEffect(() => {
        const createOrUpdateCart = async () => {
            if (sessionData.length > 0) {
                const res = await axios.post("http://localhost:8000/api/order/createcart", {
                    cartItems: sessionData.filter((i) => i !== undefined),
                    id,
                })
            }
        }

        // createOrUpdateCart()
        createOrUpdateCart()
        const totalPrice: number[] = []

        for (let i = 0; i < sessionData.length; i++) {
            if (sessionData[i]) {
                const price = parseFloat(sessionData[i].price)
                const discount = parseFloat(sessionData[i].discount)

                totalPrice.push(discount ? (price - price * discount) : price)
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
            parsed.price = parsed.price / parsed.quantity
            parsed.quantity = parsed.quantity - 1

            sessionStorage.setItem(e.target.id, JSON.stringify(parsed))
            setAmount(amount - 1)
        }
    }

    const incrementAmount = (e: any) => {
        const item: any = sessionStorage.getItem(e.target.id)
        const parsed = JSON.parse(item)
        parsed.quantity = parsed.quantity + 1
        parsed.price = parsed.price * parsed.quantity

        sessionStorage.setItem(e.target.id, JSON.stringify(parsed))
        setAmount(amount + 1)
    }

    const removeItem = (e: any) => {
        sessionStorage.removeItem(e.target.id)
        setAmount(amount - 1)
    }

    const nextStep = () => Router.push("/address")

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="header">
                    <div className="title">Shopping Cart</div>
                    <div className="icon"><Icons.Cart /></div>
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
                        {sessionData.map((product: any) => {
                            if (product) {
                                const price = parseFloat(product.price)
                                const discount = parseFloat(product.discount)

                                return <div key={product.primaryKey} className="product">
                                    <div className="name">
                                        <div
                                            style={{
                                                backgroundImage: "url(" +
                                                    "http://localhost:8000/" + product.photo
                                                    + ")",
                                                backgroundPosition: "center center",
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                width: "50px",
                                                height: "50px",
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
                                        {discount ? (price - price * discount) : price}
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
                                <div className="total-price">{total + totalCurrency}</div>
                            </div>
                            {sessionData.length > 0
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
                    margin-top: 20px
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
                    font-family: SegoeUIBold, serif;
                    font-size: 20px;
                }
                .icon{
                    background: #ff7070;
                    height: 30px;
                    width: 30px;
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
                    font-family: SegoeUIBold, serif;
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
                    font-family: SegoeUIBold, serif;
                }
                .remove{
                    cursor: pointer;
                    user-select: none;
                }
                .price{
                    font-family: SegoeUIBold, serif;
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
                    font-family: SegoeUIBold, serif;
                }
            `}</style>
        </div>
    )
}
