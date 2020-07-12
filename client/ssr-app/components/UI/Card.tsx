import React, { ReactElement, useRef, useEffect, useState } from "react"
import Button from "./Button"

export interface Props {
    textPosition?: "center" | "left" | "right"
    subTitle?: string | React.ReactNode
    actionButton?: React.ReactNode
    customStyleObject?: object
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    backgroundColor?: string
    header?: React.ReactNode
    [propName: string]: any
    body?: React.ReactNode
    borderRadius?: string
    windowWidth?: number
    onClick?: () => void
    borderColor?: string
    className?: string
    fontSize?: string
    border?: boolean
    bgImage?: string
    title?: string
    color?: string
}

export default function Card(props: Props) {
    const cardRef: any = useRef()
    const [cardHeight, setHeight] = useState()

    useEffect(() => {
        setHeight(cardRef.current.getBoundingClientRect().height)
    }, [])

    const btnPosition = (textPosition: string) => {
        switch (textPosition) {
            case "center":
                return "center"
            case "left":
                return "flex-start"
            case "right":
                return "flex-end"
            default:
                break
        }
    }

    const commonTextStyle = {
        textAlign: props.textPosition ? props.textPosition : "center",
        marginRight: props.textPosition === "right" ? "30px" : "",
        marginLeft: props.textPosition === "left" ? "30px" : "",
        color: props.color ? props.color : "#000",
    }

    const headerStyle = {
        ...commonTextStyle,
        marginTop: "30px",
        alignSelf: props.textPosition ? btnPosition(props.textPosition) : "center",
    }

    const titleStyle = {
        ...commonTextStyle,
        marginTop: "30px",
        fontSize: props.fontSize ? props.fontSize : "16px",
        maxWidth: "200px",
        alignSelf: props.textPosition ? btnPosition(props.textPosition) : "center",
    }

    const subTitleStyle = {
        ...commonTextStyle,
        marginTop: "10px",
        fontSize: props.fontSize ? props.fontSize : "14px",
        color: "#bababa",
        marginRight: "10px",
    }

    const btnStyle = {
        marginTop: "40px",
        display: "flex",
        justifyContent: props.textPosition ? btnPosition(props.textPosition) : "center",
        marginRight: props.textPosition === "right" ? "10px" : "",
        marginLeft: props.textPosition === "left" ? "10px" : "",
        ...commonTextStyle,
    }

    const footerStyle = {
        borderTop: "1px solid #d9d9d9",
        marginTop: "10px",
        ...commonTextStyle,
    }

    const cardStyle = {
        height: "80%",
        width: "100%",
        border: props.border ? `1px solid ${props.borderColor ? props.borderColor : "#d9d9d9"}` : "none",
        background: props.bgImage ? "url(" + props.bgImage + ")" : "",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: props.backgroundColor ? props.backgroundColor : "grey",
        borderRadius: props.borderRadius ? props.borderRadius : "3px",
        paddingBottom: "10px",
        display: "flex",
    }

    return (
        <div
            className="card-item"
            ref={cardRef}
            style={{ ...cardStyle, position: "relative", flexDirection: "column", ...props.customStyleObject }}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            {props.header ? <div style={headerStyle}>{props.header}</div> : ""}
            {props.title ? <div style={titleStyle}>{props.title}</div> : ""}
            {props.subTitle ? <div style={subTitleStyle}>{props.subTitle}</div> : ""}
            <div>{props.body ? props.body : ""}</div>
            {props.actionButton ? <div style={btnStyle}>{props.actionButton}</div> : ""}
        </div>
    )
}
