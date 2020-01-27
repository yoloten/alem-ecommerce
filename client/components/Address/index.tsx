import React, { useState, useEffect } from "react"
import Router from "next/router"
import Link from "next/link"
import axios from "axios"

import Dropdown from "../UI/Dropdown"
import Button from "../UI/Button"

function index(props: any) {
    const [address, setAddress] = useState("")
    const [postalcode, setPostal] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [countriesList, setCountriesList] = useState()
    const [country, setCountry] = useState("")
    const [addressFromServer, setAddressFromServer] = useState()

    useEffect(() => {
        const dataFetching = async () => {
            const allCountries = await axios.get("https://restcountries.eu/rest/v2/all")
            const resFromAddress = await axios.get("http://localhost:8000/api/user/getuseraddress", {
                headers: { "Authorization": props.token },
            })

            const userPhone = await axios.get("http://localhost:8000/api/user/getuserphone", {
                headers: { "Authorization": props.token },
            })

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

    return (
        <>
            <div className="main">
                <div className="header">
                    <div className="title">Address data</div>
                    <div className="progress">Progress</div>
                </div>
                <form className="inputs">
                    <div className="column-one">
                        <div className="with-label">
                            <label htmlFor="address">Address</label>
                            <input id="address" className="input" type="text" onChange={addressChange} value={address} />
                        </div>
                        <div className="with-label">
                            <label htmlFor="zip">Postal Code / ZIP</label>
                            <input id="zip" className="input" type="text" onChange={postalChange} value={postalcode} />
                        </div>
                        <div className="with-label">
                            <label className="country-label" htmlFor="country">Country</label>
                            <Dropdown
                                id="country"
                                value={country ? country : "Afghanistan"}
                                width={382}
                                height="50px"
                                onChange={countryChange}
                                options={countriesList ? countriesList.map((item: any) => ({ val: item.name })) : []}
                            />
                        </div>
                    </div>
                    <div className="column-two">
                        <div className="with-label">
                            <label htmlFor="city">City</label>
                            <input id="city" className="input" type="text" onChange={cityChange} value={city} />
                        </div>
                        <div className="with-label">
                            <label htmlFor="phone">Phone Number</label>
                            <input id="phone" className="input" type="tel" onChange={phoneChange} value={phone} />
                        </div>
                    </div>
                </form>
                <div className="actions">
                    <Link href="/cart">
                        <a className="back">Back</a>
                    </Link>
                    <div className="buttons">
                        <Button
                            content="CONTINUE SHOPPING"
                            color="#fff"
                            backgroundColor="#ff7070"
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
                font-family: SegoeUIBold, serif;
                font-size: 20px
            }
            .inputs{
                margin-top: 35px;
                display: flex;
                width: 840px;
                justify-content: space-between;
                align-self: center;
            }
            label{
                font-family: SegoeUIBold, serif; 
            }
            .input{
                width: 350px;
                height: 50px;
                border-radius: 30px;
                border: 1px solid #d9d9d9;
                padding-left: 32px;
                margin-top: 10px;
            }
            .with-label{
                margin-top: 25px;
                display: flex;
                flex-direction: column;
            }
            .country-label{
                margin-bottom: 10px
            }
            .actions{
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .buttons{
                display: flex;
                width: 320px;
                justify-content: space-between;
            }
            .back{
                text-decoration: none;
                color: #000
            }
        `}</style>
        </>
    )
}

export default index
