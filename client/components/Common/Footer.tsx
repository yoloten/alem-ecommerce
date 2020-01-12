import React from "react"

export default function Footer() {
    return (
        <>
            <div className="footer">Powered by Rustam Sahatov. All rights reserved.</div>
            <style jsx>{`
                .footer{
                    margin-top: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    border-top: 1px solid #d9d9d9;
                    font-size: 18px;
                    color:  gray
                }
            `}</style>
        </>
    )
}
