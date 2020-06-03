import * as Icons from "../../public/icons/_compiled"
import { useEffect, useState } from "react"
import Card from "../UI/Card"

export default function ProsCards() {
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
        <div className="pros-cards">
            <div className="pros-header">Why you should choose us?</div>
            <div className="pros-list">
                {prosCards.map((element, i) => (
                    <Card
                        key={i}
                        header={<div className="pros-card-icon">{element.iconSmall}</div>}
                        width={windowWidth < 500 ? "300px" : "450px"}
                        title={element.title}
                        subTitle={element.subTitle}
                        color="#000"
                        textPosition="left"
                        border={true}
                        fontSize={windowWidth < 1000 ? "13px" : ""}
                        customStyleObject={i !== 2
                            ? { marginRight: windowWidth < 1000 ? "0px" : "15px", marginTop: "20px" }
                            : { marginTop: "20px" }
                        }
                    />
                ))}
            </div>
        </div>
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
