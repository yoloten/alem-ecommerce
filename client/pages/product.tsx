import * as Icons from "../public/icons/_compiled"
import { useState } from "react"
import axios from "axios"
import { v4 } from "uuid"

import WithCarousel from "../components/LandingComponents/WithCarousel"
import Navbar from "../components/Common/Navbar"
import Footer from "../components/Common/Footer"
import CheckBox from "../components/UI/CheckBox"
import Button from "../components/UI/Button"

function index({ dataFromProduct, query }: any) {
    const [photo, setPhoto] = useState(dataFromProduct.photos[0].path)
    const [checkedSize, setCheckedSize]: any = useState({})
    const [checkedColor, setCheckedColor]: any = useState({})
    const [targetSize, setTargetSize]: any = useState()
    const [targetColor, setTargetColor]: any = useState()
    const [amount, setAmount]: any = useState(1)
    const [alert, setAlert]: any = useState("")
    const [addedItem, setAddedItem]: any = useState(1)
    const [forNavbar, setForNavbar] = useState("")

    const changePhoto = (e: any) => {
        setPhoto(e.target.id)
    }

    const changeCheckedSize = (event: any) => {
        setCheckedSize({ ...checkedSize, [event.target.name]: event.target.checked })
        setTargetSize(event.target.name)

        if (!event.target.checked) {
            setTargetSize()
        }
    }

    const changeCheckedColor = (event: any) => {
        setCheckedColor({ ...checkedColor, [event.target.name]: event.target.checked })
        setTargetColor(event.target.name)

        if (!event.target.checked) {
            setTargetColor()
        }
    }

    const addToCart = () => {
        const toCart = {
            discount: dataFromProduct.price.discount,
            currency: dataFromProduct.price.currency,
            primaryKey: dataFromProduct.primaryKey,
            price: dataFromProduct.price.price,
            name: dataFromProduct.name,
            color: targetColor,
            size: targetSize,
            quantity: amount,
            photo,
        }

        if (!targetColor) {
            setAlert("Choose color")
        }
        else if (!targetSize) {
            setAlert("Choose size")
        } else {
            setAlert("")
            sessionStorage.setItem(v4(), JSON.stringify(toCart))

            const id = sessionStorage.getItem("id")

            if (!id) {
                sessionStorage.setItem("id", v4())
            }

            setForNavbar(v4())
        }
    }

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    const incrementAmount = () => setAmount(amount + 1)

    return (
        <div>
            <Navbar data={forNavbar} />
            <div className="details-main">
                <div className="details-maininfo">
                    <div className="details-photos">
                        <div className="details-photo-list">
                            {dataFromProduct ? dataFromProduct.photos.map((item: any) => (
                                <div key={item.primaryKey} id={item.path} onClick={changePhoto} style={{
                                    backgroundImage: "url(" + "http://localhost:8000/" + item.path + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    width: "100px",
                                    height: "100px",
                                    marginBottom: "10px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }} />
                            )) : "..."}
                        </div>
                        <div
                            className="details-first-photo"
                            style={{ backgroundImage: "url(" + "http://localhost:8000/" + photo + ")" }}
                        />
                    </div>
                    <div className="details-info">
                        <div className="details-delivery">
                            <div className="details-standard">
                                <div className="details-icon"><Icons.TruckEmpty /></div>
                                <div className="details-shipping-info">
                                    <div className="details-shipping-title">Standard shipment</div>
                                    <div className="details-shipping-text">Free within 3-6 bussiness days</div>
                                </div>
                            </div>
                            <div className="details-standard">
                                <div className="details-icon"><Icons.TruckFull /></div>
                                <div className="details-shipping-info">
                                    <div className="details-shipping-title">Express delivery</div>
                                    <div className="details-shipping-text">$35 available</div>
                                </div>
                            </div>
                        </div>

                        <div className="details-product">
                            <div className="details-sale-id">
                                <div className={`${dataFromProduct.price.discount ? "sale" : ""}`}>
                                    {dataFromProduct.price.discount ? "SALE" : ""}
                                </div>
                                <div className="details-id">{`Product ID: ${dataFromProduct.primaryKey}`}</div>
                            </div>

                            <div className="details-product-name">
                                {dataFromProduct.name}
                            </div>
                            <div className="details-price-brand">
                                {parseFloat(dataFromProduct.price.discount)
                                    && parseFloat(dataFromProduct.price.discount) !== 0
                                    ? <div className="details-prices">
                                        <div className="details-price">
                                            {
                                                (parseFloat(dataFromProduct.price.price) - parseFloat(dataFromProduct.price.price) * parseFloat(dataFromProduct.price.discount)).toFixed(2)
                                            }
                                            {dataFromProduct.price.currency}
                                        </div>
                                        <div className="details-oldprice">
                                            {parseFloat(dataFromProduct.price.price).toFixed(2) + " " + dataFromProduct.price.currency}
                                        </div>
                                    </div>
                                    : <div className="details-oldprice">
                                        {parseFloat(dataFromProduct.price.price) + " " + dataFromProduct.price.currency}
                                    </div>
                                }
                                <div className="details-brand">{dataFromProduct.brand.name}</div>
                            </div>
                        </div>

                        <div className="details-checkboxes">
                            <div className="details-colors">
                                <div className="details-colors-title">Color:</div>
                                <div className="details-color-list">
                                    {dataFromProduct.colors.map((child: any, i: number) => (
                                        <div key={i} className="details-name">
                                            <CheckBox
                                                id={child.id}
                                                name={child.name}
                                                checked={checkedColor[child.name]}
                                                onChange={changeCheckedColor}
                                                dataType="color"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="details-colors">
                                <div className="details-colors-title">Size:</div>
                                <div className="details-color-list">
                                    {dataFromProduct.sizes.map((child: any, i: number) => (
                                        <div key={i} className="details-name">
                                            <CheckBox
                                                id={child.id}
                                                name={child.name}
                                                checked={checkedSize[child.name]}
                                                onChange={changeCheckedSize}
                                                dataType="size"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="details-actions">
                            <div className="details-quantity">
                                <div className="details-quantity-title">Quantity:</div>
                                <div className="details-quantity-box">
                                    <div className="details-remove" onClick={decrementAmount}>-</div>
                                    <div className="details-number">{amount}</div>
                                    <div className="details-remove" onClick={incrementAmount}>+</div>
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
                    <div className="details-additional">
                        <div className="details-description">
                            <div className="details-description-icon"><Icons.Paper /></div>
                            <div className="details-description-title">Details and Description</div>
                            <div className="details-description-text">{dataFromProduct.description}</div>
                        </div>
                        <div className="details-description">
                            <div className="details-description-icon"><Icons.Tools /></div>
                            <div className="details-description-title">Material(s) and care</div>
                            <div className="details-material-care">
                                <div className="details-materials">
                                    {dataFromProduct.materials.map((item: any) => (
                                        <div key={item.id} className="details-material">{item.name}</div>
                                    ))}
                                </div>
                                <div className="details-materials">
                                    {dataFromProduct.care.map((item: any) => (
                                        <div key={item.id} className="details-material">{item.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="details-carousel">
                    <WithCarousel />
                </div>
            </div>
            <Footer />
        </div>
    )
}

index.getInitialProps = async (ctx: any) => {

    const resFromProduct = await axios.get("http://localhost:8000/api/product/onebyprimarykey", {
        params: { primarykey: ctx.query.primarykey },
    })

    return {
        dataFromProduct: resFromProduct.data,
        query: ctx.query,
    }
}

export default index
