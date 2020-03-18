import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"

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

    return (
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
                            <div className="grid-card">
                                <Card
                                    bgImage={"http://localhost:8000/" + (props.fromFilters
                                        ? product.path
                                        : product.photos[0].path)
                                    }
                                    height={windowWidth < 1560 ? "220px" : "300px"}
                                    width={windowWidth < 1560 ? "220px" : "300px"}
                                    key={product.primaryKey}
                                    borderRadius="0px"
                                />
                                <div className="grid-name">{product.name}</div>
                                <div >
                                    <div className="grid-prices">
                                        {discount
                                            ? <>
                                                <div className="grid-price">
                                                    {
                                                        Math.round(
                                                            (price - price * discount)
                                                            * 100) / 100 + " " + currency
                                                    }
                                                </div>
                                                <div className="grid-oldprice">{price + " " + currency}</div>
                                            </>
                                            : <div className="grid-oldprice">{price + " " + currency}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }) : ""}
            </div>
    )
}
