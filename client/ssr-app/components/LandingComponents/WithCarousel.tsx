import React from "react"

import * as Icons from "../../public/icons/_compiled"
import Carousel from "nuka-carousel"
import Button from "../UI/Button"
import Card from "../UI/Card"

export default function WithCarousel(props: any) {
    const previousButton = ({ previousSlide }: any) => (
        <div style={{ marginTop: "-80px" }}>
            <Icons.ArrowRight style={{ cursor: "pointer" }} onClick={previousSlide} />
        </div>
    )

    const nextButtom = ({ nextSlide }: any) => (
        <div style={{ marginTop: "-80px" }}>
            <Icons.ArrowLeft style={{ cursor: "pointer" }} onClick={nextSlide} />
        </div>
    )

    return (
        <div className="withcarousel-popular">
            {props.header === "withcarousel-popular-header" ? (
                <div className="withcarousel-popular-header">
                    <div className="withcarousel-popular-title">Popular</div>
                    <Button
                        content="Show More"
                        color="#fff"
                        backgroundColor="#ff7070"
                        borderRadius="30px"
                        height="50px"
                        width="120px"
                    />
                </div>
            ) : (
                <div className="withcarousel-pros-header">You may also be interested</div>
            )}
            <Carousel
                className="carousel"
                height="500px"
                slideWidth="340px"
                cellSpacing={45}
                wrapAround={false}
                renderCenterLeftControls={previousButton}
                renderCenterRightControls={nextButtom}
            >
                {[0, 1, 2, 3, 4].map((i) => (
                    <div className="withcarousel-card" key={i}>
                        <Card height="375px" width="350px" backgroundColor="purple" color="#fff" fontSize="30px" />
                        <div className="withcarousel-product-info">
                            <div className="withcarousel-product-name">Jacket</div>
                            <div className="withcarousel-product-price">
                                <div className="withcarousel-new-price">$21.99</div>
                                <div
                                    className="withcarousel-old-price"
                                    style={{
                                        textDecoration: "line-through",
                                    }}
                                >
                                    $39.99
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
