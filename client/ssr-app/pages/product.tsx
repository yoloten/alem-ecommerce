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

function index({ product, query }: any): JSX.Element {
    const [photo, setPhoto] = useState(product.photos[0].path)
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

    const addToCart = async () => {
        let ifAllChosen = false

        const toCart = {
            discount: product.discount,
            currency: product.currency,
            product_id: product.id,
            price: product.price,
            name: product.name,
            quantity: amount,
            ...checkedEnum,
            photo,
        }

        const enumsFromProduct = Object.keys(product).filter((i) => i.slice(-5) === "_enum")
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
            setAlert("Added to cart!")
        }
    }

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    const incrementAmount = () => {
        if (amount < product.count) {
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
                            {product &&
                                product.photos.map((item: any) => (
                                    <div
                                        key={item.path}
                                        id={item.path}
                                        onClick={changePhoto}
                                        className="details-photo-small"
                                        style={{
                                            backgroundImage: "url(" + "http://localhost:8000/" + item.path + ")",
                                        }}
                                    />
                                ))}
                        </div>
                        <div
                            className="details-first-photo"
                            style={{
                                backgroundImage: "url(" + "http://localhost:8000/" + photo + ")",
                            }}
                        />
                    </div>
                    <div className="details-info">
                        <div className="details-product">
                            <div className="details-sale-id">
                                {parseFloat(product.discount) > 0 && (
                                    <div className="details-sale">{parseFloat(product.discount) * 100}%</div>
                                )}
                                <div className="details-id">{`Product ID: ${product.id}`}</div>
                            </div>

                            <div className="details-product-name">{product.name}</div>
                            <div className="details-price-brand">
                                {parseFloat(product.discount) !== 0 ? (
                                    <div className="details-prices">
                                        <div className="details-price">
                                            {(
                                                parseFloat(product.price) -
                                                parseFloat(product.price) * parseFloat(product.discount)
                                            ).toFixed(2)}
                                            {product.currency}
                                        </div>
                                        <div className="details-oldprice">
                                            {parseFloat(product.price).toFixed(2) + " " + product.currency}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="details-oldprice">
                                        {parseFloat(product.price) + " " + product.currency}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="details-checkboxes">
                            {Object.keys(product)
                                .filter((i: any) => i.includes("_name"))
                                .map((item: any, i: any) => {
                                    if (item.slice(0, 8) !== "category" && product[item]) {
                                        return (
                                            <div key={product[item] + i} className="details-colors">
                                                <div className="details-colors-title">
                                                    {item.slice(0, 1).toUpperCase() + item.slice(1, -5)}
                                                </div>
                                                <div className="details-name">
                                                    <div>{product[item]}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            <div className="details-checkboxes">
                                {Object.keys(product).map((attr: any, i: number) => {
                                    if (attr.includes("_enum") && product[attr].length > 0) {
                                        return (
                                            <div key={i + attr} className="details-colors">
                                                <div className="details-colors-title">{attr}:</div>
                                                <div className="details-name">
                                                    {product[attr].map((opt: any) => (
                                                        <div key={opt + attr}>
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
                                                        </div>
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
                    <div className="details-description-text">{product.description}</div>
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
        product: resFromProduct.data,
        query,
    }
}

export default index
