// import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from "react-stripe-elements"
import React, { useState } from "react"
// import Router from "next/router"
import axios from "axios"

// import Button from "../UI/Button"

const createOptions = (fontSize: string) => {
    return {
        style: {
            base: {
                fontSize,
                color: "#424770",
                letterSpacing: "0.025em",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#9e2146",
            },
        },
    }
}

export default function PaymentForm({ orderDetails, stripe, authToken }: any) {
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const { token } = await stripe.createToken()

        if (orderDetails.id) {
            const result = await axios.post(
                "http://localhost:8000/api/order/create",
                {
                    id: orderDetails.id,
                    source: token.id,
                },
                {
                    headers: { Authorization: authToken },
                },
            )

            setSuccess("Success!")

            // Router.push("/")
        }
    }

    return (
        <>
            {success ? (
                success
            ) : (
                <div className="payment-form">
                    {/* <div className="title">Payment</div>
                    <div className="sub-title">Please enter valid data</div>
                    <form onSubmit={handleSubmit}>
                        <div className="input">
                            <CardNumberElement {...createOptions("16px")} />
                        </div>

                        <div className="input">
                            <CardExpiryElement {...createOptions("16px")} />
                        </div>

                        <div className="input">
                            <CardCVCElement {...createOptions("16px")} />
                        </div>
                        <Button
                            content="PAY"
                            color="#fff"
                            backgroundColor="#ff7070"
                            borderRadius="30px"
                            height="50px"
                            width="432px"
                            type="submit"
                            customStyleObject={{ marginTop: "40px" }}
                        />
                    </form> */}
                </div>
            )}
            {/* <style jsx>{`
                .input {
                    width: 400px;
                    border-radius: 30px;
                    border: 1px solid #d9d9d9;
                    padding-left: 32px;
                    margin-top: 10px;
                    padding-bottom: 15px;
                    padding-top: 15px;
                }
                .payment-form {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 40px;
                }
                .title {
                    font-family: SegoeUIBold, serif;
                    font-size: 20px;
                }
                .sub-title {
                    color: gray;
                    margin-bottom: 20px;
                }
            `}</style> */}
        </>
    )
}

// export default injectStripe(PaymentForm)
