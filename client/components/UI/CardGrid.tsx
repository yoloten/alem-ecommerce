import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

import Card from "./Card"

namespace Grid {
    export interface Props {
        onMouseEnter?: () => void
        onMouseLeave?: () => void
        [propName: string]: any
        fromFilters?: boolean
        onClick?: () => void
        className?: string
        content?: any
    }
}

export default function CardGrid(props: Grid.Props) {
    const router = useRouter()

    return (
        <>
            <div className="grid">
                {props.content !== " " ? props.content.map((product: any, index: number) => {
                    let discount: number
                    let price: number
                    let currency: string
                    let primaryKey: number | string

                    if (props.fromFilters) {
                        discount = parseInt(product.discount, 10)
                        price = parseInt(product.price, 10)
                        currency = product.currency
                        primaryKey = product.productPrimaryKey
                    } else {
                        discount = parseInt(product.price.discount, 10)
                        price = parseInt(product.price.price, 10)
                        currency = product.price.currency
                        primaryKey = product.primaryKey
                    }

                    return (
                        <Link href={`/product?primarykey=${primaryKey}`} key={index}>
                            <div className="card">
                                <Card
                                    bgImage={"http://localhost:8000/" + (props.fromFilters
                                        ? product.path
                                        : product.photos[0].path)
                                    }
                                    height="300px"
                                    width="300px"
                                    key={product.primaryKey}
                                    borderRadius="0px"
                                />
                                <div className="name">{product.name}</div>
                                <div >
                                    <div className="prices">
                                        {discount
                                            ? <>
                                                <div className="price">
                                                    {
                                                        Math.round(
                                                            (price - price * discount)
                                                            * 100) / 100 + " " + currency
                                                    }
                                                </div>
                                                <div className="old-price">{price + " " + currency}</div>
                                            </>
                                            : <div className="old-price">{price + " " + currency}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }) : ""}
            </div>
            <style jsx>{`
                .grid{
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    margin-top: 40px
                }
                .card{
                    margin-bottom: 60px;
                    margin-left: 2.84vw;
                    cursor: pointer
                }
                .name{
                    font-size: 14px;
                    margin-top: 20px
                }
                .prices{
                    display: flex;
                    width: 200px;
                    font-size: 16px;
                    justify-content: space-between;
                    font-family: 'Poppins', serif;
                }
                .price{
                    color: red
                }
                .old-price{
                    color: grey;
                }
            `}</style>
        </>
    )
}
