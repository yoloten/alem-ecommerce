import Link from "next/link"
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
   
    return (
        <>
            <div className="grid">
                {props.content !== " " ? props.content.map((product: any, index: number) => {
                    const discount = parseInt(product.discount, 10)
                    const price = parseInt(product.price, 10)

                    return (
                        <Link href={`/product?primarykey=${product.productPrimaryKey}`}>
                            <div className="card" key={index}>
                                <Card
                                    bgImage={"http://localhost:8000/" + (props.fromFilters
                                        ? product.path
                                        : product.photos[0].path)
                                    }
                                    height="375px"
                                    width="330px"
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
                                                            (price - price * discount) * 100
                                                        ) / 100 + " " + product.currency
                                                    }
                                                </div>
                                                <div className="old-price">{price + " " + product.currency}</div>
                                            </>
                                            : <div className="old-price">{price + " " + product.currency}</div>
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
                    margin-left: 2.84vw
                }
                .name{
                    font-size: 16px;
                    margin-top: 40px
                }
                .prices{
                    display: flex;
                    width: 200px;
                    font-size: 20px;
                    justify-content: space-between;
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
