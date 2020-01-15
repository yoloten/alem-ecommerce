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

const Checkbox = ({ type = "checkbox", name, checked = false, onChange, id }: any) => (
    <input type={type} name={name} checked={checked} onChange={onChange} id={id}/>
)

export default Checkbox
