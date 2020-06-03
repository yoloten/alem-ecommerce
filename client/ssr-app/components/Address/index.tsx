import React, { useState, useEffect } from "react"
import Router from "next/router"
import Link from "next/link"
import axios from "axios"

import Dropdown from "../UI/Dropdown"
import Button from "../UI/Button"
import Progress from "../UI/Progress"

function index(props: any) {
    const [address, setAddress] = useState("")
    const [postalcode, setPostal] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [countriesList, setCountriesList] = useState()
    const [country, setCountry] = useState("")
    const [addressFromServer, setAddressFromServer] = useState()
    const [delivery, setDelivery] = useState()
    const [deliveryFocus, setDeliveryFocus] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

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
            const allCountries = await axios.get("https://restcountries.eu/rest/v2/all")
            const resFromAddress = await axios.get("http://localhost:8000/api/user/getuseraddress", {
                headers: { "Authorization": props.token },
            })

            const userPhone = await axios.get("http://localhost:8000/api/user/getuserphone", {
                headers: { "Authorization": props.token },
            })

            const allDelivery = await axios.get("http://localhost:8000/api/order/alldelivery", {
                headers: { "Authorization": props.token },
            })

            if (allDelivery.data) {
                setDelivery(allDelivery.data)
            }

            if (userPhone.data) {
                setPhone(userPhone.data.phone)
            }

            if (resFromAddress.data) {
                setAddress(resFromAddress.data.address)
                setPostal(resFromAddress.data.postalcode)
                setCity(resFromAddress.data.city)
                setCountry(resFromAddress.data.country)
                setAddressFromServer(resFromAddress.data)
            }

            setCountriesList(allCountries.data)
        }

        dataFetching()
    }, [])

    const postalChange = (e: any) => setPostal(e.target.value)
    const addressChange = (e: any) => setAddress(e.target.value)
    const countryChange = (e: any) => setCountry(e.target.value)
    const cityChange = (e: any) => setCity(e.target.value)
    const phoneChange = (e: any) => setPhone(e.target.value)

    const continueShopping = () => Router.push("/")

    const onSubmit = async (e: any) => {
        e.preventDefault()

        if (address && city && country && postalcode) {
            const addressData = {
                address,
                city,
                country,
                postalcode,
            }

            if (addressFromServer.address === address
                && addressFromServer.country === country
                && addressFromServer.city === city
            ) {
                console.log("same")
            } else {
                await axios.post("http://localhost:8000/api/user/createaddress", addressData, {
                    headers: { "Authorization": props.token },
                })
            }

            if (props.decoded.phone === phone) {
                console.log("phone")
            } else {
                await axios.post("http://localhost:8000/api/user/updatephone", { phone }, {
                    headers: { "Authorization": props.token },
                })
            }

            Router.push("/order")
        } else {
            console.log("Please fill all fields")
        }

    }

    const onDelivery = (e: any) => {
        sessionStorage.setItem("deliveryPrimaryKey", e.target.id)
        setDeliveryFocus(true)
    }
 
    return (
        <>
            <div className="address-main">
                <div className="address-header">
                    <div className="address-title">Address data</div>
                    <Progress status="address" />
                </div>
                <div className="address-content">
                    <form className="address-inputs">
                        <div className="address-column-one">
                            <div className="address-with-label">
                                <label htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    className="address-input"
                                    type="text"
                                    onChange={addressChange}
                                    value={address}
                                />
                            </div>
                            <div className="address-with-label">
                                <label htmlFor="zip">Postal Code / ZIP</label>
                                <input
                                    id="zip"
                                    className="address-input"
                                    type="text"
                                    onChange={postalChange}
                                    value={postalcode}
                                />
                            </div>
                            <div className="address-with-label">
                                <label className="country-label" htmlFor="country">Country</label>
                                <Dropdown
                                    id="country"
                                    value={country ? country : "Afghanistan"}
                                    width={windowWidth < 371 ? 306 : 332}
                                    height="45px"
                                    onChange={countryChange}
                                    options={countriesList
                                        ? countriesList.map((item: any) => ({ val: item.name }))
                                        : []
                                    }
                                />
                            </div>
                        </div>
                        <div className="address-column-two">
                            <div className="address-with-label">
                                <label htmlFor="city">City</label>
                                <input
                                    id="city"
                                    className="address-input"
                                    type="text"
                                    onChange={cityChange}
                                    value={city}
                                />
                            </div>
                            <div className="address-with-label">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    className="address-input"
                                    type="tel"
                                    onChange={phoneChange}
                                    value={phone}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="address-delivery">
                        {delivery ? delivery.map((item: any, i: number) => (
                            <div
                                id={item.primaryKey}
                                onClick={onDelivery}
                                className="address-delivery-method"
                                key={i}
                                tabIndex={i}
                            >
                                <div className="address-label" id={item.primaryKey}>{item.label}</div>
                                <div className="address-price" id={item.primaryKey}>
                                    {item.price + " " + item.currency}
                                </div>
                            </div>
                        )) : ""}
                    </div>
                </div>

                <div className="address-actions">
                    <Link href="/cart">
                        <a className="address-back">Back</a>
                    </Link>
                    <div className="address-buttons">
                        <Button
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
                        <Button
                            onClick={onSubmit}
                            content="NEXT STEP"
                            color="#fff"
                            backgroundColor="#ff7070"
                            borderRadius="30px"
                            height="50px"
                            width="120px"
                            type="submit"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default index
