import * as React from "react"

function Add(props: any) {
    return (
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M10 20C4.486 20 0 15.514 0 10S4.486 0 10 0s10 4.486 10 10-4.486 10-10 10zm0-18.75c-4.825 0-8.75 3.925-8.75 8.75s3.925 8.75 8.75 8.75 8.75-3.925 8.75-8.75S14.825 1.25 10 1.25z"
                fill="#3A3A3A"
            />
            <path d="M14.375 10.625h-8.75a.625.625 0 010-1.25h8.75a.625.625 0 010 1.25z" fill="#3A3A3A" />
            <path
                d="M10 15a.625.625 0 01-.625-.625v-8.75a.625.625 0 011.25 0v8.75c0 .345-.28.625-.625.625z"
                fill="#3A3A3A"
            />
        </svg>
    )
}

export default Add
