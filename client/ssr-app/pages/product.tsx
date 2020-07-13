import { useState, useEffect } from "react"
import Link from "next/link"
import React from "react"
import axios from "axios"
import { v4 } from "uuid"

import WithCarousel from "../components/LandingComponents/WithCarousel"
import * as Icons from "../public/icons/_compiled"
import Navbar from "../components/Common/Navbar"
import Footer from "../components/Common/Footer"
import CheckBox from "../components/UI/CheckBox"
import Dropdown from "../components/UI/Dropdown"
import Button from "../components/UI/Button"
import { slice } from "lodash"

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

    const changeEnum = (event: any) => {
        const { name, id, value } = event.target

        if (value) {
            setCheckedEnum({ ...checkedEnum, [name]: value })
        } else {
            const newCheckedEnum = { ...checkedEnum }

            delete newCheckedEnum[name]
            setCheckedEnum(newCheckedEnum)
        }
    }

    const addToCart = async () => {
        const ifAllChosen: boolean[] = []

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
                ifAllChosen.push(true)
            } else {
                ifAllChosen.push(false)
                setAlert(`you did not choose ${i}`)
            }
        })

        if (!ifAllChosen.includes(false)) {
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
            <div className="details">
                <div className="details-routes">
                    <Link href="/">
                        <a className="filters-navigation">Home/</a>
                    </Link>
                    {/* <Link
                        href={{
                            pathname: "/categories",
                            // query: {
                            //     name: query.base.split("-")[0],
                            //     id: query.base.split("-")[1],
                            // },
                        }}
                    >
                        <a className="category-navigation">{query.base.split("-")[0] + "/"}</a>
                    </Link>
                    <Link href="/filters" as={`/${query.category}`}>
                        <a className="filters-navigation">{query.category + "/"}</a>
                    </Link> */}
                </div>
                <div className="details-maininfo">
                    <div className="details-photos">
                        <div className="details-photos-list">
                            {product &&
                                product.photos.map((item: any) => (
                                    <div
                                        key={item.path}
                                        id={item.path}
                                        onClick={changePhoto}
                                        className="details-photos-small"
                                        style={{
                                            backgroundImage: "url(" + "http://localhost:8000/" + item.path + ")",
                                        }}
                                    >
                                        <div className={item.path === photo ? "details-photos-selected" : ""}></div>
                                    </div>
                                ))}
                        </div>
                        <div
                            className="details-photos-first"
                            style={{
                                backgroundImage: "url(" + "http://localhost:8000/" + photo + ")",
                            }}
                        />
                    </div>
                    <div className="details-info">
                        <div className="details-product">
                            <div className="details-product-name">{product.name}</div>
                            <div className="details-product-sale">
                                {parseFloat(product.discount) > 0 && (
                                    <div className="details-sale">{parseFloat(product.discount) * 100}%</div>
                                )}
                                {/* <div className="details-id">{`Product ID: ${product.id}`}</div> */}
                            </div>

                            <div className="details-product-pricesbox">
                                {parseFloat(product.discount) !== 0 ? (
                                    <>
                                        <div className="details-product-pricesbox-price">
                                            {(
                                                parseFloat(product.price) -
                                                parseFloat(product.price) * parseFloat(product.discount)
                                            ).toFixed(2)}
                                            {product.currency}
                                        </div>
                                        <div className="details-product-pricesbox-oldprice strike">
                                            {parseFloat(product.price).toFixed(2) + " " + product.currency}
                                        </div>
                                    </>
                                ) : (
                                    <div className="details-oldprice">
                                        {parseFloat(product.price) + " " + product.currency}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="details-secondary">
                            {Object.keys(product)
                                .filter((i: any) => i.includes("_name") || i.includes("_enum"))
                                .map((item: any, i: any) => {
                                    if (item.slice(0, 8) !== "category" && product[item] && product[item].length > 0) {
                                        return (
                                            <div key={product[item] + i} className="details-secondary-item">
                                                <div className="details-secondary-title">
                                                    {item.slice(0, 1).toUpperCase() +
                                                        item.slice(1).split("_").join(" ").slice(0, -5)}
                                                    :
                                                </div>

                                                <div>
                                                    {Array.isArray(product[item])
                                                        ? product[item].join(", ")
                                                        : product[item]}
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            <div className="details-secondary-item">
                                <div className="details-secondary-title">Brief description:</div>{" "}
                                <div>{product.description}</div>
                            </div>
                            <div className="details-checkboxes">
                                {Object.keys(product).map((attr: any, i: number) => {
                                    if (attr.includes("_enum") && product[attr].length > 0) {
                                        return (
                                            <div key={i + attr} className="details-colors">
                                                <Dropdown
                                                    required={true}
                                                    placeholder={
                                                        "Please select " + attr.split("_").join(" ").slice(0, -5)
                                                    }
                                                    bgColor="#2233690a"
                                                    id={attr}
                                                    name={attr}
                                                    height={46}
                                                    borderRadius="6px"
                                                    width={210}
                                                    value={checkedEnum[attr] ? checkedEnum[attr] : ""}
                                                    onChange={changeEnum}
                                                    options={product[attr].map((opt: any) => ({
                                                        value: opt,
                                                        label: opt.slice(0, 1).toUpperCase() + opt.slice(1),
                                                    }))}
                                                />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>

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
                            content={
                                <>
                                    <Icons.Cart color="#fff" style={{ marginLeft: "-20px" }} />
                                    <div style={{ marginLeft: "20px" }}>ADD TO CART</div>
                                </>
                            }
                            color="#fff"
                            backgroundColor="#000"
                            borderRadius="6px"
                            height="50px"
                            width="180px"
                            onClick={addToCart}
                        />
                    </div>
                    <div style={{ height: "16px", color: "red" }}>{alert.toUpperCase()}</div>
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
