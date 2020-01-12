import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../actions/product"
import * as Icons from "../../public/icons/_compiled"
import Carousel from "nuka-carousel"
import { useEffect } from "react"
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
        <>
            <div className="popular">
                {props.header === "popular-header"
                    ?
                    <div className="popular-header">
                        <div className="popular-title">Popular</div>
                        <Button
                            content="Show More"
                            color="#fff"
                            backgroundColor="#ff7070"
                            borderRadius="30px"
                            height="50px"
                            width="120px"
                        />
                    </div> 
                    :
                    <div className="pros-header">Products in today</div>
                }

                <Carousel
                    className="carousel"
                    height="500px"
                    slideWidth="340px"
                    cellSpacing={45}
                    wrapAround={false}
                    renderCenterLeftControls={previousButton}
                    renderCenterRightControls={nextButtom}
                    renderBottomCenterControls={(): any => { }}
                >
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div className="card" key={i}>
                            <Card
                                height="375px"
                                width="350px"
                                backgroundColor="purple"
                                color="#fff"
                                fontSize="30px"
                            />
                            <div className="product-info">
                                <div className="product-name">Jacket</div>
                                <div className="product-price">
                                    <div className="new-price">$21.99</div>
                                    <div className="old-price" style={{
                                        textDecoration: "line-through",
                                    }}>$39.99</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            <style jsx>{`
                .popular{
                    margin-top: 120px;
                }
                .popular-header{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 60px;
                }
                .popular-title{
                    font-size: 29px
                }
                .product-info{
                    margin-top: 40px
                }
                .product-price {
                    width: 200px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                }
                .new-price{
                    font-size: 20px;
                    color: red;
                }
                .old-price{
                    font-size: 20px;
                    color: grey;
                }
                .pros-header{
                    text-align: center;
                    font-size: 29px;
                    margin-bottom: 60px;
                }
            `}</style>
        </>
    )
}
