import React from "react"

export interface Props {
    customStyleObject?: Record<string, unknown>
    content?: string | React.ReactNode
    [propName: string]: unknown
    children?: React.ReactNode
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    backgroundColor?: string
    size?: "big" | "small"
    borderRadius?: string
    borderColor?: string
    className?: string
    fontSize?: string
    border?: boolean
    height?: string
    color?: string
    width?: string
    type?: string
    onClick?: any
    id?: string
}

export function Button(props: Props): JSX.Element {
    const btnStyle = {
        backgroundColor: props.backgroundColor
            ? `${props.base ? "transaprent" : props.backgroundColor}`
            : `${props.base ? "transaprent" : "grey"}`,
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
