import * as Icons from "../../public/icons/_compiled"
import React, { useState, useEffect } from "react"

export interface Props {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    [propName: string]: any
    onClick?: () => void
    className?: string
    checked?: boolean
    type?: "checkbox"
    height?: string
    value?: string
    width?: string
    name?: string
    id?: string
}

export default function Checkbox({
    type = "checkbox",
    name,
    checked,
    onChange,
    id,
    width,
    height,
    value,
    className,
}: Props): JSX.Element {
    const [click, setClick] = useState(0)

    const counter = () => {
        setClick(click + 1)
    }

    return (
        <div className="checkbox-main">
            <input
                className={className}
                style={{
                    width: width ? width : "26px",
                    height: height ? height : "26px",
                }}
                value={click % 2 === 0 ? value : ""}
                onChange={onChange}
                onClick={counter}
                name={name}
                type={type}
                id={id}
            />
            <div
                style={{
                    marginLeft: width ? "-" + width : "-44px",
                    height: height ? height : "26px",
                    width: width ? width : "26px",
                    background: click % 2 === 0 ? "transparent" : "#000",
                }}
                className="checkbox"
            >
                {checked ? <Icons.CheckMark width="19px" height="19px" /> : ""}
            </div>
        </div>
    )
}
