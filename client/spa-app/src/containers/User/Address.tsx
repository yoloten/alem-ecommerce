import { createOrUpdateAddress, getUserAddresses, AddressInterface } from "actions/user/address"
import { useDispatch, useSelector } from "react-redux"
import { deleteMsg } from "reducers/user/userReducer"
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
    const [state, setState]: any = useState({
        postalcode: "",
        address: "",
        phone: "",
        city: "",
        id: null,
    })
    const [delivery, setDelivery] = useState([])
    const [deliveryFocus, setDeliveryFocus] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

    const { isLoggedIn, msg, addresses } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserAddresses())
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        if (addresses.length > 0) {
            addresses.map((address) => {
                if (address.selected) {
                    setState({
                        postalcode: address.postalcode,
                        address: address.address,
                        phone: address.phone,
                        city: address.city,
                        id: address.id,
                    })
                }
            })
        }
    }, [addresses])

    useEffect(() => {
        setTimeout(() => dispatch(deleteMsg()), 3000)
    }, [msg])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions)

        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [])

    const updateDimensions = () => setWindowWidth(window.innerWidth)

    const onFieldsChange = (e: any) => {
        e.persist()

        setState((state: any) => ({ ...state, [e.target.name]: e.target.value }))
    }
    // const onDelivery = (e: any) => {
    //     sessionStorage.setItem("deliveryPrimaryKey", e.target.id)
    //     setDeliveryFocus(true)
    // }

    const selectAddress = (e: any) => {
        const address = addresses[parseInt(e.target.id, 10)]

        setState({
            postalcode: address.postalcode,
            address: address.address,
            phone: address.phone,
            city: address.city,
            id: address.id,
        })
    }

    const setNewAddress = () => {
        setState({
            postalcode: "",
            address: "",
            phone: "",
            city: "",
            id: null,
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const { address, city, postalcode, phone, id } = state

        const addressData: AddressInterface = {
            postalcode,
            address,
            phone,
            city,
            id,
        }

        dispatch(createOrUpdateAddress(addressData))
        //     navigation.navigate("/order")
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
                    {addresses.length > 0 &&
                        addresses.map((address, i) => {
                            return (
                                <div key={address.address + i} className="table-content">
                                    <div className="table-product">
                                        <div className="table-product-attribute">{address.city}</div>
                                        <div className="table-product-attribute">{address.address}</div>
                                        <div className="table-product-attribute">{address.postalcode}</div>
                                        <div className="table-product-attribute">{address.phone}</div>
                                        <UI.Button
                                            onClick={selectAddress}
                                            id={i.toString()}
                                            width="80px"
                                            content="Select"
                                        />
                                    </div>
                                </div>
                            )
                        })}
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
                                content="NEW ADDRESS"
                                color="#ff7070"
                                border={true}
                                backgroundColor="#fff"
                                borderRadius="30px"
                                height="50px"
                                width="120px"
                                onClick={setNewAddress}
                            />
                            <UI.Button
                                content="NEXT STEP"
                                color="#fff"
                                backgroundColor="#ff7070"
                                borderRadius="30px"
                                height="50px"
                                width="120px"
                            />
                        </form>
                    </div>

                    <div className="address-actions">
                        <Link className="address-back" href="/cart">
                            Back
                        </Link>
                        <div className="msg">{msg}</div>
                        <div className="address-buttons">
                            <Link href="/">
                                <UI.Button
                                    content="CONTINUE SHOPPING"
                                    color="#000"
                                    backgroundColor="#fff"
                                    border={true}
                                    borderColor="#ff7070"
                                    borderRadius="30px"
                                    height="50px"
                                    width="180px"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <Login />
            )}
        </>
    )
}
