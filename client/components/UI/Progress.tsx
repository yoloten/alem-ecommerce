import * as Icons from "../../public/icons/_compiled"
import React from "react"

export default function Progress(props: any) {

    const show = () => {
        const line = {
            width: "70px",
            height: "1px",
            background: "#d9d9d9",
            marginLeft: "15px",
            marginRight: "15px",
        }

        const icon = {
            height: "35px",
            width: "35px",
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }

        switch (props.status) {
            case "cart":
                return (
                    <>
                        <div className="icon" style={{ ...icon, ...{ background: "#ff7070" } }}>
                            <Icons.Cart color="#fff" />
                        </div>
                        <div className="line" style={line} />
                        <div className="icon"><Icons.Truck color="#c5c5c5" /></div>
                        <div className="line" style={line} />
                        <div className="icon"><Icons.CreditCard color="#c5c5c5" /></div>
                    </>
                )
            case "address":
                return (
                    <>
                        <div className="icon" style={{ ...icon, ...{ border: "1px solid #ff7070" } }}>
                            <Icons.Cart color="#ff7070" />
                        </div>
                        <div className="line" style={line} />
                        <div className="icon" style={{ ...icon, ...{ background: "#ff7070" } }}>
                            <Icons.Truck color="#fff" />
                        </div>
                        <div className="line" style={line} />
                        <div className="icon"><Icons.CreditCard color="#c5c5c5" /></div>
                    </>
                )
            case "order":
                return (
                    <>
                        <div className="icon" style={{ ...icon, ...{ border: "1px solid #ff7070" } }}>
                            <Icons.Cart color="#ff7070" />
                        </div>
                        <div className="line" style={line} />
                        <div className="icon" style={{ ...icon, ...{ border: "1px solid #ff7070" } }}>
                            <Icons.Truck color="#ff7070" />
                        </div>
                        <div className="line" style={line} />
                        <div className="icon" style={{ ...icon, ...{ background: "#ff7070" } }}>
                            <Icons.CreditCard color="#fff" />
                        </div>
                    </>
                )
            default:
                break
        }
    }

    return (
        <>
            <div className="progress">
                {show()}
            </div>
            <style jsx>{`
                .progress{
                    display: flex;
                    align-items: center
                }
                .line{
                    width: 70px;
                    height: 1px;
                    background: #d9d9d9;
                    margin-left: 15px;
                    margin-right: 15px
                }
                .icon{
                    height: 35px;
                    width: 35px;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }
            `}</style>
        </>
    )
}
