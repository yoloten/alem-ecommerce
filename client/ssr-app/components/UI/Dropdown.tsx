import * as Icons from "../../public/icons/_compiled"
import React, { useState } from "react"

export default function Dropdown(props: any) {
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(!open)

    const showOptions = () => {
        if (props.macros) {
            return props.macros.map((opt: any, index: number) => (
                <option
                    key={index}
                    value={JSON.stringify(opt)}
                >
                    {opt.name}
                </option>
            ))
        } else {
            return props.options.map((opt: any, index: number) => (
                <option
                    key={index}
                    value={props.name === "category" ? opt.uuid : opt.value}
                >
                    {props.name === "category" ? opt.name : opt.label}
                </option>
            ))
        }
    }

    return (
        <>
            <div className={props.className}>
                <select
                    required={props.required ? true : false}
                    id={props.id} name={props.name}
                    onClick={onOpen}
                    onChange={props.onChange}
                    value={props.value}
                >
                    <option value="">Select option</option>
                    {props.extraTypes && props.extraTypes.length > 0
                        ? props.extraTypes.map((type: any, index: number) => (
                            <option key={index} value={JSON.stringify({ name: type })}>{type}</option>
                        ))
                        : ""
                    }
                    {showOptions()}
                </select>
                <div className="arrow">
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
                    <div className="icon">{open ? <Icons.ArrowUp /> : <Icons.ArrowDown />}</div>
                </div>
            </div>
            <style jsx>{`
                .dropdown-text {
                    height: 100%;  
                }
                .placeholder {
                    font-size: 11px;
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 3px
                }
                select{
                    width: ${props.width}px;
                    height: ${props.height ? props.height + "px" : "40px"};
                    border-radius: ${props.borderRadius ? props.borderRadius : "50px"};
                    cursor: pointer;
                    opacity: 0;
                    appearance: none;
                    outline: none;
                    color: transparent;
                    position: absolute
                }
                .arrow{
                    width: ${props.width - 40}px;
                    min-height: ${props.height ? props.height + "px" : "40px"};
                    border: ${props.border ? "1px solid " + `${props.borderColor ? props.borderColor : "#d9d9d9"}` : "none"};
                    border-radius: ${props.borderRadius ? props.borderRadius : "50px"};
                    cursor: pointer;
                    background: ${props.bgColor ? props.bgColor : "#fff"};
                    padding-left: 25px;
                    padding-right: 20px;
                    z-index: -1;
                    outline: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    word-break: break-all 
                }
                .icon{
                    margin-top: -2px
                }
                option{
                    margin-top: 5px;
                    cursor: pointer
                }
            `}</style>
        </>
    )
}
