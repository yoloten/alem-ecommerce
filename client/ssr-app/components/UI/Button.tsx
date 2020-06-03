import React from "react"

namespace Btn {
    export interface Props {
        customStyleObject?: object
        children?: React.ReactNode
        onMouseEnter?: () => void
        onMouseLeave?: () => void
        backgroundColor?: string
        [propName: string]: any
        size?: "big" | "small"
        borderRadius?: string
        onClick?: any
        borderColor?: string
        focusable?: boolean
        className?: string
        fontSize?: string
        content?: string | React.ReactNode
        height?: string
        color?: string
        width?: string
        border?: boolean
        id?: string
        type?: string
    }
}

export default function Button(props: Btn.Props) {

    const btnStyle = {
        backgroundColor: props.backgroundColor ? `${props.base ? "transaprent" : props.backgroundColor}` : `${props.base ? "transaprent" : "grey"}`,
        border: props.border ? `1px solid ${props.borderColor ? props.borderColor : "grey"}` : "none",
        borderRadius: props.borderRadius ? props.borderRadius : "4px",
        fontSize: props.fontSize ? props.fontSize : "14px",
        height: props.height ? props.height : "35px",
        width: props.width ? props.width : "120px",
        color: props.color ? props.color : "black",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
    }

    const style = props.customStyleObject ? { ...btnStyle, ...props.customStyleObject } : { ...btnStyle }

    return (
        <button
            className={props.className}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            style={style}
            id={props.id}
            type={props.type ? "button" : undefined}
        >
            {props.content}
        </button>
    )
}
