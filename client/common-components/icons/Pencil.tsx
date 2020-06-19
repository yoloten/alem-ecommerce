import * as React from "react"

function Pencil(props: any): JSX.Element {
    return (
        <svg width={13} height={14} viewBox="0 0 13 14" fill="none" {...props}>
            <path
                d="M12.822.616l-.431-.432a.61.61 0 00-.862 0l-.57.57L.984 10.73l-.003.005a.21.21 0 00-.02.027c-.005.008-.012.015-.016.024l-.925 1.93a.203.203 0 00.271.271l1.93-.924c.01-.005.018-.012.026-.018a.194.194 0 00.025-.018l.006-.004 9.975-9.975.569-.57a.61.61 0 000-.861zM1.406 12.002l-.401-.401.237-.495.517.142.142.517-.495.237z"
                fill="#000"
            />
        </svg>
    )
}

export default Pencil
