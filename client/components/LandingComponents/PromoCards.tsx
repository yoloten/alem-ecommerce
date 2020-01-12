import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../actions/product"
import { useEffect } from "react"
import Button from "../UI/Button"
import Card from "../UI/Card"
import React from "react"

export default function PromoCards() {
    return (
        <>
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
            <style jsx>{`
                .promocards{
                    margin-top: 40px;
                    display: flex;
                    justify-content: space-between
                }
            `}</style>
        </>
    )
}
