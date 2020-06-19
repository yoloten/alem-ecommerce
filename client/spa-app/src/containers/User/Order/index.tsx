import { getOrderDetails, createOrder } from "actions/user/order"
import { useDispatch, useSelector } from "react-redux"
import { deleteMsg } from "reducers/user/userReducer"
import React, { useState, useEffect } from "react"
import InputMask from "react-input-mask"
import { RootState } from "reducers"
import jwtDecode from "jwt-decode"
import { Link } from "react-navi"
import axios from "axios"

import * as UI from "../../../../../common-components/src"
// import Progress from "../UI/Progress"

export default function index(): JSX.Element {
    const [toPayment, setToPayment] = useState(false)
    const [cardInfo, setCardInfo] = useState({
        number: "",
        exp: "",
        cvc: "",
    })

    const { orderDetails, user, msg } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(deleteMsg())
        }, 3000)
    }, [msg])

    useEffect(() => {
        dispatch(getOrderDetails())
    }, [])

    const onChangeCardInfo = (e: any) => {
        e.persist()

        setCardInfo((state: any) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = () => {
        dispatch(createOrder({ orderDetails, card: cardInfo }))
    }

    return (
        <>
            <div className="order-main">
                <div className="order-header">
                    <div className="order-title">Summary</div>
                    {/* <Progress status="order" /> */}
                </div>
                <div className="order-methods">
                    <div className="order-payment">
                        <div className="order-payment-title">Payment method</div>
                        <div className="order-payment-cards">
                            <InputMask
                                style={{ borderBottom: "1px solid #fff", color: "#fff" }}
                                onChange={onChangeCardInfo}
                                mask="9999 9999 9999 9999"
                                placeholder="Card Number"
                                required={true}
                                name="number"
                            />
                            <InputMask
                                style={{ marginTop: "30px", borderBottom: "1px solid #fff", color: "#fff" }}
                                onChange={onChangeCardInfo}
                                placeholder="Exp."
                                required={true}
                                mask="99/99"
                                name="exp"
                            />
                            <InputMask
                                style={{ marginTop: "60px", borderBottom: "1px solid #fff", color: "#fff" }}
                                onChange={onChangeCardInfo}
                                placeholder="CVC"
                                required={true}
                                name="cvc"
                                mask="999"
                            />
                        </div>
                    </div>
                    <div className="order-delivery">
                        <div className="order-payment-title">Delivery method</div>
                        <div className="order-delivery-card">
                            {/* {delivery ? (
                                    <>
                                        <div className="order-label" id={delivery.primaryKey}>
                                            {delivery.label}
                                        </div>
                                        <div className="order-price" id={delivery.primaryKey}>
                                            {delivery.price + " " + delivery.currency}
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )} */}
                        </div>
                    </div>
                    <div className="order-address">
                        <div className="order-payment-title">Address delivery</div>
                        {orderDetails && orderDetails.address && (
                            <div className="order-address-box">
                                <div className="order-address-name">{user.name}</div>
                                <div className="order-address-name">
                                    {orderDetails.address.address +
                                        ", " +
                                        orderDetails.address.city +
                                        ", " +
                                        orderDetails.address.postalcode}
                                </div>
                                <div className="order-address-name">{orderDetails.address.country}</div>
                                <div className="order-address-name">{orderDetails.address.phone}</div>
                                <div className="order-address-name">{user.email}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="order-cart">
                    <div className="order-grid">
                        <div className="order-payment-title">Your cart</div>
                        <div className="order-table-content">
                            {orderDetails.cart &&
                                orderDetails.cart.length > 0 &&
                                orderDetails.cart.map((product: any, i: number) => {
                                    if (product) {
                                        const price = parseFloat(product.price)
                                        const discount = parseFloat(product.discount)

                                        return (
                                            <div key={product.key} className="order-product">
                                                <div className="order-name">
                                                    {/* <div
                                                            style={{
                                                                backgroundImage:
                                                                    "url(" +
                                                                    "http://localhost:8000/" +
                                                                    product.photo +
                                                                    ")",
                                                                backgroundPosition: "center center",
                                                                backgroundRepeat: "no-repeat",
                                                                backgroundSize: "cover",
                                                                minWidth: "45px",
                                                                minHeight: "45px",
                                                                borderRadius: "100%",
                                                                marginRight: "10px",
                                                            }}
                                                        /> */}
                                                    {product.id}
                                                </div>
                                                {/* <div className="order-color">{product.color}</div>
                                                    <div className="order-color">{product.size.toUpperCase()}</div> */}
                                                <div className="order-color">{product.quantity}</div>
                                                <div className="order-color order-price">
                                                    {discount ? price - price * discount : price}
                                                    {product.currency}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return ""
                                    }
                                })}
                        </div>
                    </div>
                    <div className="order-total">
                        <div className="order-total-title">Total Cost</div>
                        <div className="order-price">
                            {orderDetails ? orderDetails.total_price + orderDetails.currency : ""}
                        </div>
                    </div>
                </div>
                <div className="order-actions">
                    <Link href="/user/address">
                        <a className="order-back">Back</a>
                    </Link>
                    <div className="msg">{msg}</div>
                    <div className="order-buttons">
                        <UI.Button
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
                        <UI.Button
                            onClick={onSubmit}
                            content="PAY"
                            color="#fff"
                            backgroundColor="#ff7070"
                            borderRadius="30px"
                            height="50px"
                            width="140px"
                            type="submit"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
