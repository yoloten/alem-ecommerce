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

const Checkbox = ({ type = "checkbox", name, checked = false, onChange, id, dataType, width, height }: any) => {

    const showContent = () => {
        switch (dataType) {
            case "color":
                return <div 
                    style={{
                        width: checked ? "42px" : "32px",
                        height: checked ? "42px" : "32px",
                        background: name,
                        margin: checked ? "auto" : "4px 0px 0px 4px",
                        border: "0.5px solid #d9d9d9",
                    }}
                />
            case "size": 
                return <div 
                    style={{
                        width: "42px",
                        height: "34px",
                        background: checked ? "#d9d9d9" : "transparent",
                        paddingTop:  "8px" ,
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
                    width: ${ width ? width : "42px"};
                    height: ${ height ? height : "42px"};
                    cursor: pointer
                }
                .styled{
                    position: absolute;
                    width: ${ width ? width : "42px"};
                    height: ${ height ? height : "42px"};
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
