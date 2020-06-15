import { deleteMsg } from "reducers/user/userReducer"
import { createOrUpdateAddress } from "actions/user/address"
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import { Link, useCurrentRoute } from "react-navi"
import { navigation } from "containers/Navigation"
import InputMask from "react-input-mask"
import { RootState } from "reducers"
import axios from "axios"

import * as UI from "../../../../common-components/src"
import Navbar from "components/Navbar"
import Login from "../Auth/Login"

export default function Address(): JSX.Element {
    const [state, setState] = useState({
        postalcode: "",
        address: "",
        phone: "",
        city: "",
    })
    const [addressFromServer, setAddressFromServer] = useState()
    const [delivery, setDelivery] = useState([])
    const [deliveryFocus, setDeliveryFocus] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

    const { isLoggedIn, msg } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => dispatch(deleteMsg()), 3000)
    }, [msg])

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions)

        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [])

    const updateDimensions = () => setWindowWidth(window.innerWidth)

    useEffect(() => {
        const dataFetching = async () => {
            //         const resFromAddress = await axios.get("http://localhost:8000/api/user/getuseraddress", {
            //             headers: { Authorization: props.token },
            //         })
            //         const userPhone = await axios.get("http://localhost:8000/api/user/getuserphone", {
            //             headers: { Authorization: props.token },
            //         })
            //         const allDelivery = await axios.get("http://localhost:8000/api/order/alldelivery", {
            //             headers: { Authorization: props.token },
            //         })
            //         if (allDelivery.data) {
            //             setDelivery(allDelivery.data)
            //         }
            //         if (userPhone.data) {
            //             setPhone(userPhone.data.phone)
            //         }
            //         if (resFromAddress.data) {
            //             setAddress(resFromAddress.data.address)
            //             setPostal(resFromAddress.data.postalcode)
            //             setCity(resFromAddress.data.city)
            //             setCountry(resFromAddress.data.country)
            //             setAddressFromServer(resFromAddress.data)
            //         }
        }

        dataFetching()
    }, [])
    console.log(state)
    const onFieldsChange = (e: any) => {
        e.persist()

        setState((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const continueShopping = () => navigation.navigate("/")

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const { address, city, postalcode, phone } = state

        const addressData = {
            postalcode,
            address,
            phone,
            city,
        }

        dispatch(createOrUpdateAddress(addressData))
        //     if (
        //         addressFromServer.address === address &&
        //         addressFromServer.country === country &&
        //         addressFromServer.city === city
        //     ) {
        //         console.log("same")
        //     } else {
        //         await axios.post("http://localhost:8000/api/user/createaddress", addressData, {
        //             headers: { Authorization: props.token },
        //         })
        //     }

        //     if (props.decoded.phone === phone) {
        //         console.log("phone")
        //     } else {
        //         await axios.post(
        //             "http://localhost:8000/api/user/updatephone",
        //             { phone },
        //             {
        //                 headers: { Authorization: props.token },
        //             },
        //         )
        //     }

        //     navigation.navigate("/order")
    }

    const onDelivery = (e: any) => {
        sessionStorage.setItem("deliveryPrimaryKey", e.target.id)
        setDeliveryFocus(true)
    }

    return (
        <>
            <Navbar />
            {isLoggedIn ? (
                <div className="address-main">
                    <div className="address-header">
                        <div className="address-title">Address data</div>
                        {/* <Progress status="address" /> */}
                    </div>
                    <div className="address-content">
                        <form action="submit" onSubmit={onSubmit} className="address-inputs">
                            <div className="address-column-one">
                                <div className="address-with-label">
                                    <label htmlFor="address">Address</label>
                                    <UI.Input
                                        required={true}
                                        border={true}
                                        borderColor="#ddd"
                                        name="address"
                                        width={274}
                                        id="address"
                                        type="text"
                                        onChange={onFieldsChange}
                                        value={state.address}
                                    />
                                </div>
                                <div className="address-with-label">
                                    <label htmlFor="zip">Postal Code / ZIP</label>
                                    <UI.Input
                                        required={true}
                                        border={true}
                                        borderColor="#ddd"
                                        name="postalcode"
                                        width={274}
                                        id="zip"
                                        type="text"
                                        onChange={onFieldsChange}
                                        value={state.postalcode}
                                    />
                                </div>
                            </div>
                            <div className="address-column-two">
                                <div className="address-with-label">
                                    <label htmlFor="city">City</label>
                                    <UI.Input
                                        required={true}
                                        border={true}
                                        borderColor="#ddd"
                                        name="city"
                                        width={274}
                                        id="city"
                                        type="text"
                                        onChange={onFieldsChange}
                                        value={state.city}
                                    />
                                </div>
                                <div className="address-with-label">
                                    <label htmlFor="phone">Phone Number</label>
                                    <UI.Input
                                        required={true}
                                        border={true}
                                        borderColor="#ddd"
                                        name="phone"
                                        width={274}
                                        id="phone"
                                        type="tel"
                                        onChange={onFieldsChange}
                                        value={state.phone}
                                    />
                                </div>
                            </div>
                            <UI.Button
                                content="NEXT STEP"
                                color="#fff"
                                backgroundColor="#ff7070"
                                borderRadius="30px"
                                height="50px"
                                width="120px"
                            />
                        </form>
                        <div className="address-delivery">
                            {delivery
                                ? delivery.map((item: any, i: number) => (
                                      <div
                                          id={item.primaryKey}
                                          onClick={onDelivery}
                                          className="address-delivery-method"
                                          key={i}
                                          tabIndex={i}
                                      >
                                          <div className="address-label" id={item.primaryKey}>
                                              {item.label}
                                          </div>
                                          <div className="address-price" id={item.primaryKey}>
                                              {item.price + " " + item.currency}
                                          </div>
                                      </div>
                                  ))
                                : ""}
                        </div>
                    </div>

                    <div className="address-actions">
                        <Link className="address-back" href="/cart">
                            Back
                        </Link>
                        <div className="msg">{msg}</div>
                        <div className="address-buttons">
                            <UI.Button
                                content="CONTINUE SHOPPING"
                                color="#000"
                                backgroundColor="#fff"
                                border={true}
                                borderColor="#ff7070"
                                borderRadius="30px"
                                height="50px"
                                width="180px"
                                type="submit"
                                onClick={continueShopping}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Login />
            )}
        </>
    )
}
