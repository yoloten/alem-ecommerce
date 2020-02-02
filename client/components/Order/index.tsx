import { StripeProvider, Elements } from "react-stripe-elements"
import React, { useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import Link from "next/link"
import axios from "axios"

import Button from "../UI/Button"
import Progress from "../UI/Progress"
import PaymentProvider from "./PaymentProvider"

export default function index(props: any) {
    const [toPayment, setToPayment] = useState(false)
    const [orderDetails, setOrderDetails] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [delivery, setDelivery] = useState()
    const [decoded, setDecoded] = useState(jwtDecode(props.token))
    const [sessionData, setSessionData] = useState(
        Object.keys(sessionStorage).map((key: string) => {
            if (key !== "id" && key !== "deliveryPrimaryKey") {
                const data: any = sessionStorage.getItem(key)
                const parsed = JSON.parse(data)
                parsed.key = key

                return parsed
            }
        }))

    useEffect(() => {
        const getAddress = async () => {
            const userAddress = await axios.get("http://localhost:8000/api/user/getuseraddress", {
                headers: { "Authorization": props.token },
            })

            const userPhone = await axios.get("http://localhost:8000/api/user/getuserphone", {
                headers: { "Authorization": props.token },
            })

            const details = await axios.get("http://localhost:8000/api/order/orderdetails", {
                headers: { "Authorization": props.token },
                params: {
                    id: sessionStorage.getItem("id"),
                },
            })

            const oneDelivery = await axios.get("http://localhost:8000/api/order/onedelivery", {
                headers: { "Authorization": props.token },
                params: {
                    primaryKey: sessionStorage.getItem("deliveryPrimaryKey"),
                },
            })

            setDelivery(oneDelivery.data)
            setOrderDetails(details.data)
            setPhone(userPhone.data.phone)
            setAddress(userAddress.data)
        }

        getAddress()
    }, [])

    const onSubmit = async () => {
        setToPayment(!toPayment)
    }
    console.log(orderDetails)
    return (
        <>
            {!toPayment
                ? <div className="main">
                    <div className="header">
                        <div className="title">Summary</div>
                        <Progress status="order" />
                    </div>
                    <div className="methods">
                        <div className="payment">
                            <div className="payment-title">Payment method</div>
                            <div className="payment-cards"/>
                        </div>
                        <div className="delivery">
                            <div className="payment-title">Delivery method</div>
                            <div className="delivery-card">
                                {delivery
                                    ? <>
                                        <div className="label" id={delivery.primaryKey}>{delivery.label}</div>
                                        <div className="price" id=
                                            {delivery.primaryKey}>{delivery.price + " " + delivery.currency}
                                        </div>
                                    </>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="address">
                            <div className="payment-title">Address delivery</div>
                            {address && phone
                                ? <div className="address-box">
                                    <div className="address-name">{decoded.name}</div>
                                    <div className="address-name">
                                        {address.address + ", " + address.city + ", " + address.postalcode}
                                    </div>
                                    <div className="address-name">{address.country}</div>
                                    <div className="address-name">{phone}</div>
                                    <div className="address-name">{decoded.email}</div>
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                    <div className="cart">
                        <div className="grid">
                            <div className="payment-title">Your cart</div>
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
                                            <div className="color">{product.quantity}</div>
                                            <div className="color price">
                                                {discount ? (price - price * discount) : price}
                                                {product.currency}
                                            </div>
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                        <div className="total">
                            <div className="total-title">Total Cost</div>
                            <div className="price">
                                {orderDetails ? orderDetails.totalPrice + orderDetails.currency : ""}
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <Link href="/address">
                            <a className="back">Back</a>
                        </Link>
                        <div className="buttons">
                            <Button
                                content="CONTINUE SHOPPING"
                                color="#000"
                                borderColor="#d9d9d9"
                                backgroundColor="#fff"
                                borderRadius="30px"
                                height="50px"
                                width="220px"
                                type="submit"
                                border={true}
                            //onClick={continueShopping}
                            />
                            <Button
                                onClick={onSubmit}
                                content="PROCEED TO PAYMENT"
                                color="#fff"
                                backgroundColor="#ff7070"
                                borderRadius="30px"
                                height="50px"
                                width="220px"
                                type="submit"
                            />
                        </div>
                    </div>
                </div>
                : <PaymentProvider orderDetails={orderDetails} authToken={props.token} />
            }
            <style jsx>{`
                .main{
                    margin-left: 170px;
                    margin-right: 170px;
                    display: flex;
                    flex-direction: column;
                }
                .header{
                    display: flex;
                    justify-content: space-between
                }
                .title{
                    font-family: 'PoppinsSemiBold', serif;
                    font-size: 20px
                }
                .methods{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 40px;
                    width: 80%
                }
                .cart{
                    display: flex;
                    align-items: center;
                    margin-top: 40px;
                    justify-content: space-between;
                    width: 80%
                }
                .actions{
                    margin-top: 60px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .buttons{
                    display: flex;
                    width: 450px;
                    justify-content: space-between;
                }
                .back{
                    text-decoration: none;
                    color: #000
                }
                .payment-title{
                    font-family: 'PoppinsSemiBold', serif;
                    margin-bottom: 15px
                }
                .payment-cards{
                    width: 370px;
                    height: 250px;
                    background-image: url(${"https://img5.goodfon.ru/wallpaper/nbig/5/cb/fon-logo-logo-blue-visa-fon-viza.jpg"}); 
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    border-radius: 15px;
                    margin-right: 40px
                }
                .address-box{
                    margin-top: 20px
                }
                .delivery-card{
                    width: 200px;
                    height 250px;
                    border-radius: 15px;
                    border: 1px solid #ff7070;
                    margin-top: 25px;
                    margin-right: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer
                }
                .label{
                    color: grey;
                    font-size: 20px;
                    text-align: center;
                    margin-bottom: 10px
                }
                .product{
                    display: flex;
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
                    min-width: 120px; 
                    display: flex;
                    align-items: center;
                    height: 50px;
                    justify-content: center;
                }
                .price{
                    font-family: 'PoppinsSemiBold', serif;
                }
                .total{
                    min-width: 150px; 
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 40px;
                    background: #d9d9d9;
                    padding-left: 25px;
                    padding-right: 25px;
                    border-radius: 30px;
                    margin-top: auto;
                    margin-left: 30px
                }
            `}</style>
        </>
    )
}
