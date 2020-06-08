import React from "react"

export interface Props {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string | number
    icon?: React.ReactNode
    step?: string | number
    min?: string | number
    max?: string | number
    borderRadius?: string
    borderColor?: string
    placeholder?: string
    className?: string
    required?: boolean
    bgColor?: string
    border?: boolean
    height?: number
    width: number
    name: string
    type: string
    id: string
}

export function Input(props: Props): JSX.Element {
    return (
        <div className={props.className}>
            <input
                type={props.type}
                style={{
                    borderRadius: props.borderRadius ? props.borderRadius : "50px",
                    height: props.height ? props.height + "px" : "45px",
                    width: props.width + "px",
                }}
                step={props.step ? props.step : undefined}
                required={props.required ? true : false}
                min={props.min ? props.min : undefined}
                max={props.max ? props.max : undefined}
                className={props.className}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                id={props.id}
            />
            <div
                style={{
                    border: props.border ? `1px solid ${props.borderColor ? props.borderColor : "#f1f1f1"}` : "none",
                    width: props.type === "number" ? props.width + "px" : props.width - 10 + "px",
                    borderRadius: props.borderRadius ? props.borderRadius : "50px",
                    height: props.height ? props.height + 9 + "px" : "45px",
                    background: props.bgColor ? props.bgColor : "#fff",
                }}
                className="arrow"
            >
                {props.icon && (
                    <div className="icon" style={{ height: props.height ? props.height + "px" : "45px" }}>
                        {props.icon}
                    </div>
                )}
                <div className="dropdown-text">
                    <div className="placeholder">
                        {props.placeholder && props.placeholder + `${props.required ? "*" : ""}`}
                    </div>
                </div>
            </div>
        </div>
    )
}
