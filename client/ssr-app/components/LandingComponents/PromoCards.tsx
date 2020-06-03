import { useEffect, useState } from "react"
import Button from "../UI/Button"
import Card from "../UI/Card"
import React from "react"

export default function PromoCards() {
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

    const cardHeight = () => {
        if (windowWidth < 950) {
            return "275px"
        }

        return "375px"
    }

    const bigCardWidth = () => {
    
        if (windowWidth < 800) {
            return "290px"
        }

        if (windowWidth < 950) {
            return "250px"
        }

        if (windowWidth < 1440) {
            return "390px"
        }

        if (windowWidth < 1700) {
            return "520px"
        }

        return "650px"
    }

    const smallCardWidth = () => {
        if (windowWidth < 800) {
            return "290px"
        }

        if (windowWidth < 1440) {
            return "220px"
        }

        if (windowWidth < 1800) {
            return "260px"
        }

        return "350px"
    }

    const fontSizeChange = () => {
        
        if (windowWidth < 950) {
            return "24px"
        }

        return "30px"
    }

    return (
        <div className="promocards">
            <Card
                height={cardHeight()}
                width={bigCardWidth()}
                backgroundColor="black"
                title="New arrivals are now in!"
                color="#fff"
                fontSize={fontSizeChange()}
                customStyleObject={{ justifyContent: "center", marginTop: "20px" }}
                actionButton={
                    <Button
                        content="Show Collection"
                        color="#fff"
                        backgroundColor="#ff7070"
                        borderRadius="30px"
                        height={windowWidth < 950 ? "35px" : "50px"}
                        width={windowWidth < 950 ? "96px" : "150px"}
                        fontSize={windowWidth < 950 ? "12px" : "16px"}
                    />
                }
            />
            <Card
                height={cardHeight()}
                width={smallCardWidth()}
                title="Jackets"
                subTitle="$ 39.99"
                backgroundColor="purple"
                color="#fff"
                fontSize={fontSizeChange()}
                customStyleObject={{ justifyContent: "center", marginTop: "20px" }}
                actionButton={<Button
                    content="Show All"
                    color="#fff"
                    backgroundColor="#ff7070"
                    borderRadius="30px"
                    height={windowWidth < 950 ? "35px" : "50px"}
                    width={windowWidth < 950 ? "96px" : "150px"}
                    fontSize={windowWidth < 950 ? "12px" : "16px"}
                />
                }
            />
            <Card
                height={cardHeight()}
                width={smallCardWidth()}
                title="Sale This Winter -50%"
                backgroundColor="purple"
                color="#fff"
                fontSize={fontSizeChange()}
                customStyleObject={{ justifyContent: "center", marginTop: "20px" }}
            />
        </div>
    )
}
