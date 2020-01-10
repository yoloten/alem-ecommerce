import React from "react"

namespace Styles {
    export const Background = ({ base, backgroundColor }: Btn.Props) => backgroundColor ? `${base ? "transaprent" : backgroundColor}` : `${base ? "transaprent" : "grey"}`
    export const Border = ({ base, backgroundColor }: Btn.Props) => base ? `1px solid ${backgroundColor ? backgroundColor : "grey"}` : "none"
    export const BorderRadius = ({ borderRadius }: Btn.Props) => borderRadius ? borderRadius : "4px"
    export const FontSize = ({ fontSize }: Btn.Props) => fontSize ? fontSize : "14px"
    export const Height = ({ height }: Btn.Props) => height ? height : "40px"
    export const Width = ({ width }: Btn.Props) => width ? width : "150px"
    export const Color = ({ color }: Btn.Props) => color ? color : "black"
}

namespace Btn {
    export interface Props {
        children?: React.ReactNode
        onMouseEnter?: () => void
        onMouseLeave?: () => void
        customStyleObject?: object
        backgroundColor?: string
        [propName: string]: any
        size?: "big" | "small"
        borderRadius?: string
        onClick?: () => void
        focusable?: boolean
        className?: string
        fontSize?: string
        content?: string
        height?: string
        color?: string
        width?: string
        base?: boolean
    }
}

export default function Button(props: Btn.Props) {

    const btnStyle = {
        backgroundColor: props.backgroundColor ? `${props.base ? "transaprent" : props.backgroundColor}` : `${props.base ? "transaprent" : "grey"}`,
        border: props.base ? `1px solid ${props.backgroundColor ? props.backgroundColor : "grey"}` : "none",
        borderRadius: props.borderRadius ? props.borderRadius : "4px",
        fontSize: props.fontSize ? props.fontSize : "14px",
        height: props.height ? props.height : "40px",
        width: props.width ? props.width : "150px",
        color: props.color ? props.color : "black",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
    }

    const style = props.customStyleObject ? { ...btnStyle, ...props.customStyleObject } : { ...btnStyle }
    
    return (
        <div
            className={props.className}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            style={style}
        >
            {props.content}
        </div>
    )
}
