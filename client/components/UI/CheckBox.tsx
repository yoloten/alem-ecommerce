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

const Checkbox = ({ type = "checkbox", name, checked = false, onChange, id, width, height, value }: any) => {
    const [click, setClick] = useState(0)

    const counter = () => {
        setClick(click + 1)
    }

    console.log()
    return (
        <>
            <input
                onClick={counter}
                type={type}
                value={click % 2 === 0 ? value : ""}
                name={name}
                onChange={onChange}
                id={id}
            />
            <div className="styled">
                {checked && click % 2 ? <Icons.CheckMark /> : ""}
            </div>
            <style jsx>{`
                input[type=checkbox]{
                    opacity: 0;
                    margin-left: 3px ;
                    width: ${ width ? width : "42px"};
                    height: ${ height ? height : "42px"};
                    cursor: pointer;
                }
                .styled{
                    margin-left: ${ width ? "-" + width : "-44px"};
                    width: ${ width ? width : "42px"};
                    height: ${ height ? height : "42px"};
                    border: ${"1px solid #d9d9d9"};
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
