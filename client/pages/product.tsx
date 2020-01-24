import * as Icons from "../public/icons/_compiled"
import { withAuthSync } from "../utils/auth"
import Router from "next/router"
import nextCookie from "next-cookies"
import { useState } from "react"
import axios from "axios"
import { v4 } from "uuid"

import WithCarousel from "../components/LandingComponents/WithCarousel"
import Navbar from "../components/Common/Navbar"
import Footer from "../components/Common/Footer"
import CheckBox from "../components/UI/CheckBox"
import Button from "../components/UI/Button"

function index({ dataFromProduct, query, token }: any) {
    const [photo, setPhoto] = useState(dataFromProduct.photos[0].path)
    const [checkedSize, setCheckedSize]: any = useState({})
    const [checkedColor, setCheckedColor]: any = useState({})
    const [targetSize, setTargetSize]: any = useState()
    const [targetColor, setTargetColor]: any = useState()
    const [amount, setAmount]: any = useState(1)
    const [alert, setAlert]: any = useState("")
    const [addedItem, setAddedItem]: any = useState(1)
    console.log(token)
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
            <Navbar />
            <div className="main">
                <div className="main-info">
                    <div className="photos">
                        <div className="photo-list">
                            {dataFromProduct ? dataFromProduct.photos.map((item: any) => (
                                <div key={item.primaryKey} id={item.path} onClick={changePhoto} style={{
                                    backgroundImage: "url(" + "http://localhost:8000/" + item.path + ")",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    width: "85px",
                                    height: "85px",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                }} />
                            )) : "..."}
                        </div>
                        <div className="first-photo" />
                    </div>
                    <div className="info">
                        <div className="delivery">
                            <div className="standard">
                                <div className="icon"><Icons.TruckEmpty /></div>
                                <div className="shipping-info">
                                    <div className="shipping-title">Standard shipment</div>
                                    <div className="shipping-text">Free within 3-6 bussiness days</div>
                                </div>
                            </div>
                            <div className="standard">
                                <div className="icon"><Icons.TruckFull /></div>
                                <div className="shipping-info">
                                    <div className="shipping-title">Express delivery</div>
                                    <div className="shipping-text">$35 available</div>
                                </div>
                            </div>
                        </div>

                        <div className="product">
                            <div className="sale-id">
                                <div className={`${dataFromProduct.price.discount ? "sale" : ""}`}>
                                    {dataFromProduct.price.discount ? "SALE" : ""}
                                </div>
                                <div className="id">{`Product ID: ${dataFromProduct.primaryKey}`}</div>
                            </div>

                            <div className="product-name">
                                {dataFromProduct.name}
                            </div>
                            <div className="price-brand">
                                {dataFromProduct.price.discount
                                    ? <div className="prices">
                                        <div className="price">
                                            {
                                                Math.round(
                                                    (dataFromProduct.price.price - dataFromProduct.price.price * dataFromProduct.price.discount) * 100
                                                ) / 100
                                            }
                                            {dataFromProduct.price.currency}
                                        </div>
                                        <div className="old-price">
                                            {dataFromProduct.price.price + " " + dataFromProduct.price.currency}
                                        </div>
                                    </div>
                                    : <div className="old-price">
                                        {dataFromProduct.price.price + " " + dataFromProduct.price.currency}
                                    </div>
                                }
                                <div className="brand">{dataFromProduct.brand.name}</div>
                            </div>
                        </div>

                        <div className="checkboxes">
                            <div className="colors">
                                <div className="colors-title">Color:</div>
                                <div className="color-list">
                                    {dataFromProduct.colors.map((child: any, i: number) => (
                                        <div key={i} className="name">
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
                            <div className="colors">
                                <div className="colors-title">Size:</div>
                                <div className="color-list">
                                    {dataFromProduct.sizes.map((child: any, i: number) => (
                                        <div key={i} className="name">
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
                        <div className="actions">
                            <div className="quantity">
                                <div className="quantity-title">Quantity:</div>
                                <div className="quantity-box">
                                    <div className="remove" onClick={decrementAmount}>-</div>
                                    <div className="number">{amount}</div>
                                    <div className="remove" onClick={incrementAmount}>+</div>
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
                <div className="additional-main">
                    <div className="additional-title">DESCRIPTION</div>
                    <div className="additional">
                        <div className="description">
                            <div className="description-icon"><Icons.Paper /></div>
                            <div className="description-title">Details and Description</div>
                            <div className="description-text">{dataFromProduct.description}</div>
                        </div>
                        <div className="description">
                            <div className="description-icon"><Icons.Tools /></div>
                            <div className="description-title">Material(s) and care</div>
                            <div className="material-care">
                                <div className="materials">
                                    {dataFromProduct.materials.map((item: any) => (
                                        <div key={item.id} className="material">{item.name}</div>
                                    ))}
                                </div>
                                <div className="materials">
                                    {dataFromProduct.care.map((item: any) => (
                                        <div key={item.id} className="material">{item.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="carousel">
                    <WithCarousel />
                </div>
            </div>
            <Footer />
            <style jsx>{`
                .main{
                    border-top: 1px solid #d9d9d9;
                    margin-top: 20px
                }
                .main-info{
                    display: flex;
                    justify-content: space-between;
                    margin-right: 170px;
                    margin-left: 170px;
                    margin-top: 40px
                }
                .first-photo{
                    background-image: ${"url(" + "http://localhost:8000/" + photo + ")"};
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    width: 500px;
                    height: 500px;
                    margin-left: 50px
                }
                .photos{

                    margin-top: 80px;
                    display: flex
                }
                .delivery{
                    display: flex;
                    width: 450px;
                    justify-content: space-between
                }
                .standard{
                    display: flex;
                    align-items: center;
                    font-size: 13px
                }
                .shipping-title{
                    font-family: SegoeUIBold, serif;
                }
                .shipping-info{
                    margin-left: 20px
                }
                .product{
                    width: 680px;
                }
                .sale-id{
                    margin-top: 40px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px
                }
                .sale{
                    background: red;
                    color: #fff;
                    padding: 6px 12px 6px 12px;
                    border-radius: 30px;
                    font-family: SegoeUIBold, serif;
                }
                .id{
                    color: #c4c4c4;
                    font-size: 13px
                }
                .product-name{
                    margin-top: 20px;
                    font-size: 29px
                }
                .price-brand{
                    display: flex;
                    justify-content: space-between;
                }
                .prices{
                    display: flex;
                    font-size: 29px;
                    width: 275px;
                    justify-content: space-between;
                }
                .price{
                    color: red;
                }
                .old-price{
                    color: grey;
                    text-decoration: line-through
                }
                .colors{
                    margin-top: 40px;
                }
                .color-list{
                    display: flex;
                    align-items: center;
                    margin-top: 20px
                }
                .name{
                    display: flex;
                    cursor: pointer;
                    align-items: center;
                    margin-right: 3px;
                }
                .actions{
                    margin-top: 40px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    width: 320px;
                }
                .quantity-box{
                    display: flex;
                    justify-content: space-around;
                    width: 120px;
                    height: 50px;
                    border: 1px solid #d9d9d9;
                    border-radius: 30px;
                    align-items: center;
                    font-size: 20px;
                    font-family: SegoeUIBold, serif;
                    margin-top: 20px
                }
                .additional-main{
                    margin-right: 170px;
                    margin-left: 170px;
                    margin-top: 64px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .additional-title{
                    display: flex;
                    justify-content: center;
                    width: 180px;
                    height: 50px;
                    border: 1px solid #ff7070;
                    border-radius: 30px;
                    align-items: center;
                    font-family: SegoeUIBold, serif;
                    font-size: 14px
                }
                .additional{
                   width: 1000px;
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   margin-top: 40px;
                }

                .description{
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   height: 200px;
                }

                .description-title{
                    font-family: SegoeUIBold, serif;
                    margin-top: 25px
                }
                .description-text{
                    margin-top: 15px;
                    width: 400px;
                }
                .material-care{
                    padding-top: 20px;
                }
                .materials{
                    display: flex;  
                }
                .material{
                    margin-right: 7px;
                }
                .carousel{
                    margin-right: 170px;
                    margin-left: 170px; 
                }
                .remove{
                    cursor: pointer;
                    user-select: none;
                }
            `}</style>
        </div>
    )
}

index.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx)

    const redirectOnError = () =>
        typeof window !== "undefined"
            ? Router.push("/")
            : ctx.res.writeHead(302, { Location: "/" }).end()

    try {
        const resFromProduct = await axios.get("http://localhost:8000/api/product/onebyprimarykey", {
            params: { primarykey: ctx.query.primarykey },
        })
    
        return {
            dataFromProduct: resFromProduct.data,
            query: ctx.query,
            token,
        }
    } catch (error) {
        // Implementation or Network error
        return redirectOnError()
    }
}

export default withAuthSync(index)
