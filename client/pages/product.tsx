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
                                    width: "100px",
                                    height: "100px",
                                    marginBottom: "10px",
                                    marginRight: "10px",
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
                                {parseFloat(dataFromProduct.price.discount)
                                    && parseFloat(dataFromProduct.price.discount) !== 0
                                    ? <div className="prices">
                                        <div className="price">
                                            {
                                                (parseFloat(dataFromProduct.price.price) - parseFloat(dataFromProduct.price.price) * parseFloat(dataFromProduct.price.discount)).toFixed(2)
                                            }
                                            {dataFromProduct.price.currency}
                                        </div>
                                        <div className="old-price">
                                            {parseFloat(dataFromProduct.price.price).toFixed(2) + " " + dataFromProduct.price.currency}
                                        </div>
                                    </div>
                                    : <div className="old-price">
                                        {parseFloat(dataFromProduct.price.price) + " " + dataFromProduct.price.currency}
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
                .info{
                    margin-left: 30px
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
                    font-family: 'PoppinsSemiBold', serif;
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
                    font-family: 'PoppinsSemiBold', serif;
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
                    width: 275px;
                    justify-content: space-between;
                }
                .price{
                    color: red;
                    font-size: 29px;
                }
                .old-price{
                    font-size: 29px;
                    color: grey;
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
                    font-family: 'PoppinsSemiBold', serif;
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
                    font-family: 'PoppinsSemiBold', serif;
                    font-size: 14px
                }
                .additional{
                   width: 70%;
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
                    font-family: 'PoppinsSemiBold', serif;
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
                @media (max-width: 1700px) { 
                    .product{
                        width: 500px
                    }
                    .first-photo{
                        width: 450px;
                        height: 450px;
                    }
                }
                @media (max-width: 1470px) { 
                    .product{
                        width: 450px
                    }
                    .first-photo{
                        width: 385px;
                        height: 385px;
                        margin-left: 0px;
                        margin-bottom: 20px
                    }
                    .photos{
                        display: flex;
                        flex-direction: column-reverse;
                    }
                    .photo-list{
                        display: flex;
                        margin-bottom: 40px
                    }
                }
                @media (max-width: 1200px) { 
                    .main-info{
                        margin-right: 60px;
                        margin-left: 60px;
                    }
                    .description-text{
                        width: 300px;
                    }
                    .additional{
                        width: 100%;
                     }
                }
                @media (max-width: 1000px) { 
                    .main-info{
                        margin-right: 30px;
                        margin-left: 30px;
                    }
                    .first-photo{
                        width: 300px;
                        height: 300px;
                        margin-left: 0px;
                        margin-bottom: 20px
                    }
                    .photo-list{
                        margin-bottom: 130px
                    }
                    .product{
                        width: 400px
                    }
                    .product-name{
                        font-size: 22px
                    }
                    .prices{
                        display: flex;
                        width: 275px;
                        justify-content: space-between;
                    }
                    .price{
                        font-size: 22px;
                    }
                    .old-price{
                        font-size: 22px;
                    }
                    .delivery{
                        width: 400px;
                    }
                    .additional-main{
                        margin-right: 60px;
                        margin-left: 60px;
                        margin-top: 64px;
                        
                    }
                    .carousel{
                        margin-right: 60px;
                        margin-left: 60px;
                    }
                }
                @media (max-width: 800px) { 
                   .checkboxes{
                       display: flex;
                   }
                   .color-list{
                       margin-right: 30px;
                       flex-wrap: wrap
                   }
                   .main-info{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                    }
                    .photos{
                        margin-top: 0px
                    }
                    .info{
                        margin-top: -80px;
                        margin-left: 0px
                    }
                    .additional{
                        display: flex;
                        flex-direction: column;
                        margin-top: 20px
                    }
                    .description-text{
                        text-align: center
                    }
                    .additional-main{
                        margin-top: 20px;
                    }
                    .carousel{
                        margin-right: 30px;
                        margin-left: 30px;
                    }
                }
                @media (max-width: 430px) { 
                    .info{
                        width: 280px
                    }
                    .checkboxes{
                        display: inline-block;
                    }
                    .color-list{
                        flex-wrap: wrap;
                        margin: auto
                    }
                    .delivery{
                        width: 250px;
                        flex-direction: column;
                        margin: auto;
                        margin-top: -50px;
                    }
                    .standard{
                        margin-top: 20px;
                        
                    }
                    .product-name{
                        font-size: 18px
                    }
                    .prices{
                        width: 205px;
                    }
                    .price{
                        font-size: 18px;
                    }
                    .old-price{
                        font-size: 18px;
                    }
                    .product{
                        width: 280px;
                    }
                    .sale-id{
                        margin-top: 20px;
                    }
                    .colors{
                        margin-top: 20px;
                    }
                    .actions{
                        margin-top: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        width: 280px;
                    }
                    .quantity-box{
                        margin-top: 0px;
                        margin-bottom: 20px
                    }
                    .checkboxes{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .quantity-title{
                        text-align: center
                    }
                    .colors-title{
                        text-align: center
                    }
                    .carousel{
                        margin-right: 15px;
                        margin-left: 15px;
                    }
                 }
            `}</style>
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
