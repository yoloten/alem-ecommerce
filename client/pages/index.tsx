import LandingStyle from "../public/styles/LandingStyle"
import * as Icons from "../public/icons/_compiled"
import Button from "../components/UI/Button"
import Card from "../components/UI/Card"
import Carousel from "nuka-carousel"
import Link from "next/link"

export default function index() {

    const btnClick = (): void => {
        console.log("cliks")
    }
    const previousButton = ({ previousSlide }: any) => (
        <div className="parent" style={{ marginTop: "-80px" }}>
            <Icons.ArrowRight style={{ cursor: "pointer" }} onClick={previousSlide} />
        </div>
    )

    const nextButtom = ({ nextSlide }: any) => (
        <div className="parent" style={{ marginTop: "-80px" }}>
            <Icons.ArrowLeft style={{ cursor: "pointer" }} onClick={nextSlide} />
        </div>
    )

    return (
        <>
            <div>
                <div className="header">
                    <div className="navbar">
                        <div className="logo">älem</div>
                        <div className="categories">
                            <div className="men">Men</div>
                            <div className="women">Women</div>
                        </div>
                        <div className="actions">
                            <div className="search">
                                <Icons.Search />
                            </div>
                            <div className="search">
                                <Icons.Cart />
                            </div>
                            <div className="search">
                                <Icons.Avatar />
                            </div>
                        </div>
                    </div>
                    <div className="header-main">
                        <div className="title">Brand new January Collection</div>
                        <Button
                            customStyleObject={{ marginTop: "40px" }}
                            backgroundColor="#ff7070"
                            onClick={btnClick}
                            content="Check More"
                            borderRadius="30px"
                            height="50px"
                            width="150px"
                            border={false}
                            color="#fff"
                        />
                    </div>
                </div>
                <div className="main">
                    <div className="promocards">
                        <Card
                            height="375px"
                            width="650px"
                            backgroundColor="black"
                            title="New arrivals are now in!"
                            color="#fff"
                            fontSize="30px"
                            customStyleObject={{ justifyContent: "center" }}
                            actionButton={<Button
                                content="Show Collection"
                                color="#fff"
                                backgroundColor="#ff7070"
                                borderRadius="30px"
                                height="50px"
                                width="150px"
                            />
                            }
                        />
                        <Card
                            height="375px"
                            width="350px"
                            title="Jackets"
                            subTitle="$ 39.99"
                            backgroundColor="purple"
                            color="#fff"
                            fontSize="30px"
                            customStyleObject={{ justifyContent: "center" }}
                            actionButton={<Button
                                content="Show All"
                                color="#fff"
                                backgroundColor="#ff7070"
                                borderRadius="30px"
                                height="50px"
                                width="150px"
                            />
                            }
                        />
                        <Card
                            height="375px"
                            width="350px"
                            title="Sale This Winter -50%"
                            backgroundColor="purple"
                            color="#fff"
                            fontSize="30px"
                            customStyleObject={{ justifyContent: "center" }}
                        />
                    </div>
                    <div className="popular">
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
                    <div className="pros-cards">
                        <div className="pros-header">Why you should choose us?</div>
                        <div className="pros-list">
                            {prosCards.map((element) => (
                                <Card
                                    header={<div className="pros-card-icon">{element.iconSmall}</div>}
                                    height="200px"
                                    width="450px"
                                    title={element.title}
                                    subTitle={element.subTitle}
                                    color="#000"
                                    textPosition="left"
                                    border={true}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="popular">
                        <div className="pros-header">Products in today</div>
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
                    <div className="footer">Powered by Rustam Sahatov. All rights reserved.</div>
                </div>
            </div>
            <LandingStyle/>
        </>
    )
}

const prosCards = [
    {
        iconSmall: <Icons.FreeShippingSmall />,
        title: "Free Shipping",
        subTitle: "All purchases over $199 are eligible for free shipping"
    },
    {
        iconSmall: <Icons.Wallet/>,
        title: "Easy Payment",
        subTitle: "All payments are processed instantly over a secure payment protocol",
    },
    {
        iconSmall:  <Icons.Guarantee/>,
        title: "Money-back Guarantee",
        subTitle: "If an item arrived damaged or you've changed your mind, you can send it back for a full refund",
    }
]
