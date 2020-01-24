import * as Icons from "../../public/icons/_compiled"
import Link from "next/link"
import React, { useState } from "react"

namespace Nav {
    export interface Props {
        landing?: boolean
    }
}

export default function Navbar(props: Nav.Props) {
    return (
        <>
            <div className="navbar">
                    <Link href="/">
                        <a className="logo">älem</a>
                    </Link>
                <div className="categories">
                    <Link href="/p/[category]" as={`/p/men`}>
                        <a className="men">Men</a>
                    </Link>
                    <Link href="/p/[category]" as={`/p/women`}>
                        <a className="men">Women</a>
                    </Link>
                </div>
                <div className="actions">
                    <div className="search">
                        <Icons.Search />
                    </div>
                    <Link href="/cart">
                        <a><Icons.Cart /></a>
                    </Link>
                    <Link href="/auth">
                        <a><Icons.Avatar /></a>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .navbar{
                    font-family: 'SegoeUI', serif;
                    display: flex;
                    justify-content: space-between;
                    margin-left: 170px;
                    margin-right: 170px;
                    padding-top: ${props.landing ? "40px" : "20px"}
                }
                .categories{
                    display: flex;
                    width: 100px;
                    justify-content: space-between;
                }
                .actions{
                    display: flex;
                    width: 120px;
                    justify-content: space-between;
                }
                .search{
                    cursor: pointer
                }
                .men{
                    text-decoration: none;
                    color: #000
                }
                .logo{
                    text-decoration: none;
                    color: #000
                }
            `}</style>
        </>
    )
}
