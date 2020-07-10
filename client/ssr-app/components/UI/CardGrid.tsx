import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"

import Card from "./Card"

export interface Props {
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    [propName: string]: any
    fromFilters?: boolean
    onClick?: () => void
    className?: string
    content?: any[]
}

export default function CardGrid(props: Props) {
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
            {props.content && props.content.length > 0 ? (
                props.content.map((product: any, index: number) => {
                    const discount = parseFloat(product.discount)
                    const price = parseFloat(product.price)
                    const currency = product.currency
                    const id = product.id

                    return (
                        <Link href={`/product?id=${id}`} key={index}>
                            <div className="grid-card">
                                <Card
                                    bgImage={
                                        "http://localhost:8000/" +
                                        (product.photos && product.photos.length > 0 && product.photos[0].path)
                                    }
                                    height={windowWidth < 1560 ? "220px" : "300px"}
                                    width={windowWidth < 1560 ? "220px" : "300px"}
                                    key={id}
                                    borderRadius="0px"
                                />
                                <div className="grid-name">{product.name}</div>
                                <div>
                                    <div className="grid-prices">
                                        {discount ? (
                                            <>
                                                <div className="grid-price">
                                                    {Math.round((price - price * discount) * 100) / 100 +
                                                        " " +
                                                        currency}
                                                </div>
                                                <div className="grid-oldprice">{price + " " + currency}</div>
                                            </>
                                        ) : (
                                            <div className="grid-oldprice">{price + " " + currency}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            ) : (
                <div style={{ margin: "auto", marginBottom: "20px" }}>No Items Found</div>
            )}
        </div>
    )
}
