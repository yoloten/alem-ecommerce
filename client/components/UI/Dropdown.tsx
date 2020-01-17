import * as Icons from "../../public/icons/_compiled"
import React, { useState } from "react"

export default function Dropdown(props: any) {
    const [open, setOpen] = useState(false)

    const onOpen = () =>  setOpen(!open)
    
    return (
        <>
            <select onClick={onOpen} onChange={props.onChange} >
                {props.options.map((opt: any) => (
                    <option value={opt.val}>{opt.val}</option>
                ))}
            </select>
                <div className="arrow">
                    <div className="val">{props.value}</div>
                    <div className="icon">{open ?  <Icons.ArrowUp/> : <Icons.ArrowDown/>}</div>
                </div>
            <style jsx>{`
                select{
                    width: ${props.width}px;
                    height: 40px;
                    border-radius: 50px;
                    cursor: pointer;
                    opacity: 0;
                    appearance: none;
                    outline: none;
                    color: transparent;
                }
                .arrow{
                    width: ${props.width - 40}px;
                    height: 40px;
                    border: 1px solid #d9d9d9;
                    border-radius: 50px;
                    cursor: pointer;
                    background: #fff;
                    padding-left: 20px;
                    padding-right: 20px;
                    margin-left: -${props.width}px;
                    z-index: -1;
                    outline: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
