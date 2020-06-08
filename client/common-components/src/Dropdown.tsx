import React, { useState } from "react"
import * as Icons from "../icons"

export interface Props {
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    borderRadius?: string
    borderColor?: string
    placeholder?: string
    className?: string
    required?: boolean
    extraTypes?: any
    bgColor?: string
    border?: boolean
    height?: number
    value: string
    width: number
    options?: any
    macros?: any
    name: string
    id: string
}

export function Dropdown(props: Props): JSX.Element {
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(!open)

    const showOptions = () => {
        if (props.macros) {
            return props.macros.map((opt: any, index: number) => (
                <option key={index} value={opt.name}>
                    {opt.name}
                </option>
            ))
        } else {
            return props.options.map((opt: any, index: number) => (
                <option key={index} value={props.name === "category" ? opt.uuid : opt.value}>
                    {props.name === "category" ? opt.name : opt.label}
                </option>
            ))
        }
    }

    return (
        <div className={props.className}>
            <select
                style={{
                    borderRadius: props.borderRadius ? props.borderRadius : "50px",
                    height: props.height ? props.height + "px" : "40px",
                    width: props.width + "px",
                }}
                required={props.required ? true : false}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                onClick={onOpen}
                id={props.id}
            >
                <option value="">Select option</option>
                {props.extraTypes && props.extraTypes.length > 0
                    ? props.extraTypes.map((type: any, index: number) => (
                          <option key={index} value={type}>
                              {type}
                          </option>
                      ))
                    : ""}
                {showOptions()}
            </select>
            <div
                className="dropdown"
                style={{
                    border: props.border
                        ? "1px solid " + `${props.borderColor ? props.borderColor : "#d9d9d9"}`
                        : "none",
                    borderRadius: props.borderRadius ? props.borderRadius : "50px",

                    minHeight: props.height ? props.height + "px" : "40px",
                    background: props.bgColor ? props.bgColor : "#fff",
                    width: props.width - 40 + "px",
                    cursor: "pointer",
                }}
            >
                <div className="dropdown-text">
                    <div className="placeholder">
                        {props.placeholder && props.required ? props.placeholder + "*" : ""}
                    </div>
                    <div className="val">
                        {props.name === "category"
                            ? props.options.map((opt: any, i: number) => {
                                  if (opt.uuid === props.value) {
                                      return opt.name
                                  }
                              })
                            : props.value}
                    </div>
                </div>
                <div className="dropdown-icon">{open ? <Icons.ArrowUp /> : <Icons.ArrowDown />}</div>
            </div>
        </div>
    )
}
