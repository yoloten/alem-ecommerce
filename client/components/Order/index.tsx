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
                ? <div className="order-main">
                    <div className="order-header">
                        <div className="order-title">Summary</div>
                        <Progress status="order" />
                    </div>
                    <div className="order-methods">
                        <div className="order-payment">
                            <div className="order-payment-title">Payment method</div>
                            <div className="order-payment-cards"/>
                        </div>
                        <div className="order-delivery">
                            <div className="order-payment-title">Delivery method</div>
                            <div className="order-delivery-card">
                                {delivery
                                    ? <>
                                        <div className="order-label" id={delivery.primaryKey}>{delivery.label}</div>
                                        <div className="order-price" id=
                                            {delivery.primaryKey}>{delivery.price + " " + delivery.currency}
                                        </div>
                                    </>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="order-address">
                            <div className="order-payment-title">Address delivery</div>
                            {address && phone
                                ? <div className="order-address-box">
                                    <div className="order-address-name">{decoded.name}</div>
                                    <div className="order-address-name">
                                        {address.address + ", " + address.city + ", " + address.postalcode}
                                    </div>
                                    <div className="order-address-name">{address.country}</div>
                                    <div className="order-address-name">{phone}</div>
                                    <div className="order-address-name">{decoded.email}</div>
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                    <div className="order-cart">
                        <div className="order-grid">
                            <div className="order-payment-title">Your cart</div>
                            <div className="order-table-content">
                                {sessionData.map((product: any) => {
                                    if (product) {
                                        const price = parseFloat(product.price)
                                        const discount = parseFloat(product.discount)

                                        return <div key={product.primaryKey} className="order-product">
                                            <div className="order-name">
                                                <div
                                                    style={{
                                                        backgroundImage: "url(" +
                                                            "http://localhost:8000/" + product.photo
                                                            + ")",
                                                        backgroundPosition: "center center",
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundSize: "cover",
                                                        minWidth: "45px",
                                                        minHeight: "45px",
                                                        borderRadius: "100%",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                {product.name}
                                            </div>
                                            <div className="order-color">{product.color}</div>
                                            <div className="order-color">{product.size.toUpperCase()}</div>
                                            <div className="order-color">{product.quantity}</div>
                                            <div className="order-color order-price">
                                                {discount ? (price - price * discount) : price}
                                                {product.currency}
                                            </div>
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                        <div className="order-total">
                            <div className="order-total-title">Total Cost</div>
                            <div className="order-price">
                                {orderDetails ? orderDetails.totalPrice + orderDetails.currency : ""}
                            </div>
                        </div>
                    </div>
                    <div className="order-actions">
                        <Link href="/address">
                            <a className="order-back">Back</a>
                        </Link>
                        <div className="order-buttons">
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
        </>
    )
}
