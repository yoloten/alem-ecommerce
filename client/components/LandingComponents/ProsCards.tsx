import * as Icons from "../../public/icons/_compiled"
import { useEffect, useState } from "react"
import Card from "../UI/Card"

export default function ProsCards() {
    const [windowWidth, setWindowWidth] = useState()

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
        <>
            <div className="pros-cards">
                <div className="pros-header">Why you should choose us?</div>
                <div className="pros-list">
                    {prosCards.map((element, i) => (
                        <Card
                            key={i}
                            header={<div className="pros-card-icon">{element.iconSmall}</div>}
                            width="450px"
                            title={element.title}
                            subTitle={element.subTitle}
                            color="#000"
                            textPosition={windowWidth < 600 ? "center" : "left"}
                            border={true}
                            fontSize={windowWidth < 600 ? "12px" : ""}
                            customStyleObject={i !== 2 ? {marginRight: "15px"} : {}}
                        />
                    ))}
                </div>
            </div>
            <style jsx>{`
                .pros-cards{
                    margin-top: 80px;
                }
                .pros-header{
                    text-align: center;
                    font-size: 29px;
                    margin-bottom: 60px;
                }
                .pros-list{
                    display: flex;
                    justify-content: space-between;
                    font-family: 'PoppinsSemiBold', serif;
                }
                .pros-card-icon{
                    height: 70px;
                    width: 70px;
                    border-radius: 6px;
                    background: #d9d9d9;
                    display: flex;
                    justify-content: center;
                    align-items: center
                }
                .pros-card-subtitle{
                    font-family: 'SegoeUI', serif;
                }
            `}</style>
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
        iconSmall: <Icons.Wallet />,
        title: "Easy Payment",
        subTitle: "All payments are processed instantly over a secure payment protocol",
    },
    {
        iconSmall: <Icons.Guarantee />,
        title: "Money-back Guarantee",
        subTitle: "If an item arrived damaged or you've changed your mind, you can send it back for a full refund",
    },
]
