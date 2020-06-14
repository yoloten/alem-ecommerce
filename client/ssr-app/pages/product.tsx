import { useState, useEffect } from "react"
import React from "react"
import axios from "axios"
import { v4 } from "uuid"

import WithCarousel from "../components/LandingComponents/WithCarousel"
import * as Icons from "../public/icons/_compiled"
import Navbar from "../components/Common/Navbar"
import Footer from "../components/Common/Footer"
import CheckBox from "../components/UI/CheckBox"
import Button from "../components/UI/Button"

function index({ dataFromProduct, query }: any) {
    const [photo, setPhoto] = useState(dataFromProduct.photos[0].path)
    const [checkedEnum, setCheckedEnum]: any = useState({})
    const [amount, setAmount]: any = useState(1)
    const [alert, setAlert]: any = useState("")
    const [forNavbar, setForNavbar] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setAlert("")
        }, 3000)
    }, [alert])

    const changePhoto = (e: any) => {
        setPhoto(e.target.id)
    }

    const changeCheckedEnum = (event: any) => {
        if (checkedEnum[event.target.name] !== event.target.id) {
            setCheckedEnum({ ...checkedEnum, [event.target.name]: event.target.id })
        } else {
            const newCheckedEnum = { ...checkedEnum }

            delete newCheckedEnum[event.target.name]
            setCheckedEnum(newCheckedEnum)
        }
    }

    const addToCart = () => {
        let ifAllChosen = false
        const toCart = {
            discount: dataFromProduct.discount,
            currency: dataFromProduct.currency,
            price: dataFromProduct.price,
            name: dataFromProduct.name,
            quantity: amount,
            photo,
            ...checkedEnum,
        }

        const enumsFromProduct = Object.keys(dataFromProduct).filter((i) => i.slice(-5) === "_enum")
        const enumsFromChecked = Object.keys(checkedEnum).map((i) => i)

        enumsFromProduct.map((i) => {
            if (enumsFromChecked.indexOf(i) !== -1) {
                ifAllChosen = true
            } else {
                ifAllChosen = false
                setAlert(`you did not choose ${i}`)
            }
        })

        if (ifAllChosen) {
            localStorage.setItem("product_item_" + v4(), JSON.stringify(toCart))
            const id = localStorage.getItem("id")

            if (!id) {
                localStorage.setItem("id", v4())
            }
            setForNavbar(v4())
        }
    }

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    const incrementAmount = () => {
        if (amount < dataFromProduct.count) {
            setAmount(amount + 1)
        }
    }

    return (
        <div>
            <Navbar data={forNavbar} />
            <div className="details-main">
                <div className="details-maininfo">
                    <div className="details-photos">
                        <div className="details-photo-list">
                            {dataFromProduct
                                ? dataFromProduct.photos.map((item: any) => (
                                      <div
                                          key={item.primaryKey}
                                          id={item.path}
                                          onClick={changePhoto}
                                          style={{
                                              backgroundImage: "url(" + "http://localhost:8000/" + item.path + ")",
                                              backgroundPosition: "center center",
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              width: "100px",
                                              height: "100px",
                                              marginBottom: "10px",
                                              marginRight: "10px",
                                              cursor: "pointer",
                                          }}
                                      />
                                  ))
                                : "..."}
                        </div>
                        <div
                            className="details-first-photo"
                            style={{
                                backgroundImage: "url(" + "http://localhost:8000/" + photo + ")",
                            }}
                        />
                    </div>
                    <div className="details-info">
                        <div className="details-delivery">
                            <div className="details-standard">
                                <div className="details-icon">
                                    <Icons.TruckEmpty />
                                </div>
                                <div className="details-shipping-info">
                                    <div className="details-shipping-title">Standard shipment</div>
                                    <div className="details-shipping-text">Free within 3-6 bussiness days</div>
                                </div>
                            </div>
                            <div className="details-standard">
                                <div className="details-icon">
                                    <Icons.TruckFull />
                                </div>
                                <div className="details-shipping-info">
                                    <div className="details-shipping-title">Express delivery</div>
                                    <div className="details-shipping-text">$35 available</div>
                                </div>
                            </div>
                        </div>

                        <div className="details-product">
                            <div className="details-sale-id">
                                <div className={`${parseFloat(dataFromProduct.discount) > 0 ? "sale" : ""}`}>
                                    {parseFloat(dataFromProduct.discount) > 0 ? "SALE" : ""}
                                </div>
                                <div className="details-id">{`Product ID: ${dataFromProduct.id}`}</div>
                            </div>

                            <div className="details-product-name">{dataFromProduct.name}</div>
                            <div className="details-price-brand">
                                {parseFloat(dataFromProduct.discount) && parseFloat(dataFromProduct.discount) !== 0 ? (
                                    <div className="details-prices">
                                        <div className="details-price">
                                            {(
                                                parseFloat(dataFromProduct.price) -
                                                parseFloat(dataFromProduct.price) * parseFloat(dataFromProduct.discount)
                                            ).toFixed(2)}
                                            {dataFromProduct.currency}
                                        </div>
                                        <div className="details-oldprice">
                                            {parseFloat(dataFromProduct.price).toFixed(2) +
                                                " " +
                                                dataFromProduct.currency}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="details-oldprice">
                                        {parseFloat(dataFromProduct.price.price) + " " + dataFromProduct.price.currency}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="details-checkboxes">
                            {Object.keys(dataFromProduct)
                                .filter((i: any) => i.includes("_name"))
                                .map((item: any, i: any) => {
                                    return (
                                        <div key={i} className="details-colors">
                                            <div className="details-colors-title">
                                                {item.slice(0, 1).toUpperCase() + item.slice(1, -5)}
                                            </div>
                                            <div className="details-name">
                                                <div>{dataFromProduct[item]}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            <div className="details-checkboxes">
                                {Object.keys(dataFromProduct).map((attr: any, i: number) => {
                                    if (attr.includes("_enum")) {
                                        return (
                                            <div key={i} className="details-colors">
                                                <div className="details-colors-title">{attr}:</div>
                                                <div className="details-name">
                                                    {dataFromProduct[attr].map((opt: any) => (
                                                        <>
                                                            <CheckBox
                                                                checked={
                                                                    checkedEnum.hasOwnProperty(attr) &&
                                                                    checkedEnum[attr] === opt
                                                                        ? true
                                                                        : false
                                                                }
                                                                onChange={changeCheckedEnum}
                                                                id={opt}
                                                                name={attr}
                                                            />
                                                            {opt}
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className="details-actions">
                            <div className="details-quantity">
                                <div className="details-quantity-title">Quantity:</div>
                                <div className="details-quantity-box">
                                    <div className="details-remove" onClick={decrementAmount}>
                                        -
                                    </div>
                                    <div className="details-number">{amount}</div>
                                    <div className="details-remove" onClick={incrementAmount}>
                                        +
                                    </div>
                                </div>
                            </div>
                            <Button
                                content="ADD TO CART"
                                color="#fff"
                                backgroundColor="#ff7070"
                                borderRadius="30px"
                                height="50px"
                                width="180px"
                                onClick={addToCart}
                            />
                        </div>
                        <div style={{ height: "16px", color: "red" }}>{alert.toUpperCase()}</div>
                    </div>
                </div>
                <div className="details-additional-main">
                    <div className="details-additional-title">DESCRIPTION</div>
                    <div className="details-description-text">{dataFromProduct.description}</div>
                </div>
                <div className="details-carousel">
                    <WithCarousel />
                </div>
            </div>
            <Footer />
        </div>
    )
}

index.getInitialProps = async ({ query }: any) => {
    const resFromProduct = await axios.get("http://localhost:8000/api/product/onebyid", {
        params: { id: query.id },
    })

    return {
        dataFromProduct: resFromProduct.data,
        query,
    }
}

export default index
