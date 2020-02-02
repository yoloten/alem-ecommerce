import * as Icons from "../../public/icons/_compiled"
import Link from "next/link"
import React, { useState, useEffect } from "react"

namespace Nav {
    export interface Props {
        landing?: boolean
        data?: string
        removeData?: string
    }
}

export default function Navbar(props: Nav.Props) {
    const [count, setCount]: any = useState(0)
    useEffect(() => {
        setCount(
            Object.keys(sessionStorage).map((key: string) => {
                if (key !== "id" && key !== "deliveryPrimaryKey") {
                    const data: any = sessionStorage.getItem(key)
                    const parsed = JSON.parse(data)
                    parsed.key = key

                    return parsed
                }
            }).filter((i) => i !== undefined).length
        )
    }, [])

    useEffect(() => {
        if (props.data && props.data !== "") {
            setCount(count + 1)
        }
        if (props.removeData && props.removeData !== "") {
            setCount(count - 1)
        }
    }, [props.data, props.removeData])

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
                        <a><Icons.Cart color="#000000" />
                            {count !== 0
                                ? <div
                                    className="count">{count > 1000 ? Math.floor(count / 1000) + "k" : count}
                                </div>
                                : ""
                            }
                        </a>
                    </Link>
                    <Link href="/auth">
                        <a><Icons.Avatar /></a>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .navbar{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-left: 170px;
                    margin-right: 170px;
                    padding-top: ${props.landing ? "40px" : "10px"};
                }
                .categories{
                    display: flex;
                    width: 104px;
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
                    color: #000;
                    font-size: 40px;
                    font-family: TimeBurner
                }
                a{
                    text-decoration: none;
                    position: relative
                }
                .count{
                    position: absolute;
                    background: red;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 100%;
                    width: 17px;
                    height: 17px;
                    font-size: 9px;
                    color: #fff;
                    margin-top: -30px;
                    margin-left: 10px;
                    z-index: 10
                }
            `}</style>
        </>
    )
}
