import React, { useState, useEffect } from "react"
import * as Icons from "../../public/icons/_compiled"

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

// export default function CheckBox(props: Check.Props) {
//     const [checked, setChecked] = useState(false)

//     // useEffect(() => {
//     //     if (checked) {

//     //     }
//     // }, [checked])

//     const check = () => {
//         setChecked(!checked)
//     }

//     return (
//         <>
//             <div onClick={check} className={checked ? "checkbox checked" : "checkbox"}>
//                 <div className={checked ? "icon" : "icon unchecked"}>{checked ? <Icons.CheckMark /> : ""}</div>
//                 <div className="content">{props.content}</div>
//             </div>
//             <style jsx>{`
//             .checkbox{
//                 display: flex;
//             }
//             .content{
//                 margin-left: 10px
//             }
//             .icon{
//                 height: 24px;
//                 width: 24px;
//             }
//             .unchecked{
//                 height: 22px;
//                 width: 22px;
//                 border: 1px solid grey;
//             }
//         `}</style>
//         </>
//     )
// }

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }: any) => (
    <input type={type} name={name} checked={checked} onChange={onChange} />
)

export default Checkbox
