import * as Icons from "../../public/icons/_compiled"
import React, { useState } from "react"

export default function Dropdown(props: any) {
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(!open)

    return (
        <>
            <div className="main">
                <select onClick={onOpen} onChange={props.onChange} >
                    {props.options.map((opt: any, index: number) => (
                        <option key={index} value={opt.val}>{opt.val}</option>
                    ))}
                </select>
                <div className="arrow">
                    <div className="val">{props.value}</div>
                    <div className="icon">{open ? <Icons.ArrowUp /> : <Icons.ArrowDown />}</div>
                </div>
            </div>
            <style jsx>{`
                
                select{
                    width: ${props.width}px;
                    height: ${props.height ? props.height : "40px"};
                    border-radius: 50px;
                    cursor: pointer;
                    opacity: 0;
                    appearance: none;
                    outline: none;
                    color: transparent;
                    position: absolute
                }
                .arrow{
                    width: ${props.width - 40}px;
                    height: ${props.height ? props.height : "40px"};
                    border: 1px solid #d9d9d9;
                    border-radius: 50px;
                    cursor: pointer;
                    background: #fff;
                    padding-left: 20px;
                    padding-right: 20px;
                    z-index: -1;
                    outline: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: 
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
