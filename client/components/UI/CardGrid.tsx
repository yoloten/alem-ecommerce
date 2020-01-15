import React from "react"

import Card from "./Card"

namespace Grid {
    export interface Props {
        onMouseEnter?: () => void
        onMouseLeave?: () => void
        [propName: string]: any
        onClick?: () => void
        className?: string
        content?: any
    }
}

export default function CardGrid(props: Grid.Props) {

    return (
        <>
            <div className="grid">
                {props.content !== " " ? props.content.map((product: any) => (
                    <div className="card">
                        <Card
                            bgImage={"http://localhost:8000/" + product.photos[0].path}
                            height="375px"
                            width="350px"
                            key={product.primaryKey}
                            borderRadius="0px"
                        />
                        <div className="name">{product.name}</div>
                        <div className="prices">
                            <div className="price">
                                {product.price.discount
                                    ? Math.round((product.price.price - product.price.price * product.price.discount) * 100) / 100
                                    : product.price.price
                                }
                                {" " + product.price.currency}
                            </div>
                            <div className="old-price">{product.price.discount
                                ? `${product.price.price} ${product.price.currency}`
                                : ""}
                            </div>
                        </div>
                    </div>
                )) : ""}
            </div>
            <style jsx>{`
                .grid{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    width: 100%;
                    margin-left: 40px
                }
                .card{
                    margin-bottom: 60px
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
                    text-decoration: line-through
                }
            `}</style>
        </>
    )
}
