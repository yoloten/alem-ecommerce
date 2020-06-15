import React, { useState, useEffect } from "react"
import { Link, useCurrentRoute } from "react-navi"
import { navigation } from "containers/Navigation"
import axios from "axios"

import * as UI from "../../../../common-components/src"
import Navbar from "../../components/Navbar"

export default function Address(props: any): JSX.Element {
    const [address, setAddress] = useState("")
    const [postalcode, setPostal] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [countriesList, setCountriesList] = useState([])
    const [country, setCountry] = useState("")
    const [addressFromServer, setAddressFromServer] = useState()
    const [delivery, setDelivery] = useState([])
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

    // useEffect(() => {
    //     const dataFetching = async () => {
    //         const allCountries = await axios.get("https://restcountries.eu/rest/v2/all")
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

    //         setCountriesList(allCountries.data)
    //     }

    //     dataFetching()
    // }, [])

    const postalChange = (e: any) => setPostal(e.target.value)
    const addressChange = (e: any) => setAddress(e.target.value)
    const countryChange = (e: any) => setCountry(e.target.value)
    const cityChange = (e: any) => setCity(e.target.value)
    const phoneChange = (e: any) => setPhone(e.target.value)

    const continueShopping = () => navigation.navigate("/")

    const onSubmit = async (e: any) => {
        e.preventDefault()

        // if (address && city && country && postalcode) {
        //     const addressData = {
        //         address,
        //         city,
        //         country,
        //         postalcode,
        //     }

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
        // } else {
        //     console.log("Please fill all fields")
        // }
    }

    const onDelivery = (e: any) => {
        sessionStorage.setItem("deliveryPrimaryKey", e.target.id)
        setDeliveryFocus(true)
    }

    return (
        <>
            <Navbar />
            <div className="address-main">
                <div className="address-header">
                    <div className="address-title">Address data</div>
                    {/* <Progress status="address" /> */}
                </div>
                <div className="address-content">
                    <form className="address-inputs">
                        <div className="address-column-one">
                            <div className="address-with-label">
                                <label htmlFor="address">Address</label>
                                <UI.Input
                                    name="address"
                                    width={274}
                                    id="address"
                                    type="text"
                                    onChange={addressChange}
                                    value={address}
                                />
                            </div>
                            <div className="address-with-label">
                                <label htmlFor="zip">Postal Code / ZIP</label>
                                <UI.Input
                                    name="zip"
                                    width={274}
                                    id="zip"
                                    type="text"
                                    onChange={postalChange}
                                    value={postalcode}
                                />
                            </div>
                            <div className="address-with-label">
                                <label className="country-label" htmlFor="country">
                                    Country
                                </label>
                                <UI.Dropdown
                                    id="country"
                                    name="country"
                                    value={country ? country : "Afghanistan"}
                                    width={windowWidth < 371 ? 306 : 332}
                                    height={45}
                                    onChange={countryChange}
                                    options={
                                        countriesList ? countriesList.map((item: any) => ({ val: item.name })) : []
                                    }
                                />
                            </div>
                        </div>
                        <div className="address-column-two">
                            <div className="address-with-label">
                                <label htmlFor="city">City</label>
                                <UI.Input
                                    name="city"
                                    width={274}
                                    id="city"
                                    type="text"
                                    onChange={cityChange}
                                    value={city}
                                />
                            </div>
                            <div className="address-with-label">
                                <label htmlFor="phone">Phone Number</label>
                                <UI.Input
                                    name="phone"
                                    width={274}
                                    id="phone"
                                    type="tel"
                                    onChange={phoneChange}
                                    value={phone}
                                />
                            </div>
                        </div>
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
                    <Link href="/cart">
                        <a className="address-back">Back</a>
                    </Link>
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
                        <UI.Button
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
