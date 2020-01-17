import * as Icons from "../../public/icons/_compiled"
import React, { useState, useEffect } from "react"

// namespace Check {
//     export interface Props {
//         onMouseEnter?: () => void
//         onMouseLeave?: () => void
//         [propName: string]: any
//         onClick?: () => void
//         onChange?: () => void
//         className?: string
//         content?: any
//         checked?: boolean
//     }
// }

const Checkbox = ({ type = "checkbox", name, checked = false, onChange, id, dataType }: any) => {

    const showContent = () => {
        switch (dataType) {
            case "color":
                return <div 
                    style={{
                        width: checked ? "38px" : "28px",
                        height: checked ? "38px" : "28px",
                        background: name,
                        margin: checked ? "auto" : "4px 0px 0px 4px",
                        border: "0.5px solid #d9d9d9",
                    }}
                />
            case "size": 
                return <div 
                    style={{
                        width: "36px",
                        height: "31px",
                        background: checked ? "#d9d9d9" : "transparent",
                        paddingTop:  "5px" ,
                        alignSelf: "center",
                        border: checked ? "0.5px solid #d9d9d9" : "none",
                        textAlign: "center",
                    }}
                >{name.toUpperCase()}</div>
            default:
                return checked ? <Icons.CheckMark/> : ""
        }
    }
    
    return (
        <>
            <input type={type} name={name} checked={checked} onChange={onChange} id={id} />
            <div className="styled">{showContent()}</div>
            <style jsx>{`
                input[type=checkbox]{
                    opacity: 0;
                    margin-left: 3px ;
                    width: 36px;
                    height: 36px;
                    cursor: pointer
                }
                .styled{
                    position: absolute;
                    width: 38px;
                    height: 38px;
                    border: ${checked ? "1px solid transparent" : "1px solid #d9d9d9"};
                    z-index: -1;
                    dispay: flex;
                    justify-content: center;
                    align-items: center 
                }
                .name{
                    margin-left: 10px
                }
                .color{
                    width: 20px;
                    height: 2px;
                    background: ${name}
                }
            `}</style>
        </>

    )
}

export default Checkbox
