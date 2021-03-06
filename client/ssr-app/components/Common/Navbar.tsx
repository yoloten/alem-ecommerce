import React, { useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import Router from "next/router"
import cookie from "js-cookie"
import Link from "next/link"
import axios from "axios"

import * as Icons from "../../public/icons/_compiled"

export interface Props {
    landing?: boolean
    data?: string
    removeData?: string
}

export default function Navbar(props: Props) {
    const [user, setUser]: any = useState({})
    const [count, setCount]: any = useState(0)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const token = cookie.get("token")
        const decoded: any = typeof token === "string" && jwtDecode(token)
        setUser(decoded)

        const getCategories = async () => {
            const categoriesFromServer = await axios.get("http://localhost:8000/api/category/fornavbar")

            if (categoriesFromServer.data && categoriesFromServer.data.length > 0) {
                setCategories(categoriesFromServer.data)
            }
        }

        getCategories()

        setCount(
            Object.keys(localStorage)
                .map((key) => {
                    if (key.slice(0, 13) === "product_item_") {
                        const data: any = localStorage.getItem(key)

                        if (data) {
                            const parsed = JSON.parse(data)
                            parsed.key = key

                            return parsed
                        }
                    }
                })
                .filter((i) => i !== undefined).length,
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

    const toCart = () => {
        if (process.env.NODE_ENV === "development") {
            window.location.href = `http://localhost:8080/user/cart?data=${JSON.stringify(localStorage)}`
        } else {
            Router.push("/user/cart")
        }
    }

    const toAuth = () => {
        if (process.env.NODE_ENV === "development") {
            window.location.href = "http://localhost:8080/auth/login"
        } else {
            Router.push("/auth/login")
        }
    }

    return (
        <>
            <div className="navbar">
                <Link href="/">
                    <a className="logo-nav">älem</a>
                </Link>
                <div className="categories">
                    {categories.map((category: any) => {
                        return (
                            <Link
                                key={category.name}
                                href={{
                                    pathname: "/categories",
                                    query: {
                                        name: category.name,
                                        id: category.id,
                                    },
                                }}
                            >
                                <a className="men">
                                    {category.name.slice(0, 1).toUpperCase() + category.name.slice(1).toLowerCase()}
                                </a>
                            </Link>
                        )
                    })}
                </div>
                <div className="actions" style={{ width: user ? "240px" : "120px" }}>
                    <div className="search">
                        <Icons.Search />
                    </div>
                    <div className="cart" onClick={toCart}>
                        <Icons.Cart color="#000000" />
                        {count !== 0 ? (
                            <div className="count">{count > 1000 ? Math.floor(count / 1000) + "k" : count}</div>
                        ) : (
                            ""
                        )}
                    </div>
                    {user ? (
                        <div className="user">
                            <div
                                className="avatar"
                                style={
                                    user.photo
                                        ? {
                                              backgroundImage:
                                                  "url(" + "http://localhost:8000/" + JSON.parse(user.photo).path + ")",
                                              backgroundPosition: "center center",
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              borderRadius: "100%",
                                              minHeight: "36px",
                                              minWidth: "36px",
                                          }
                                        : {
                                              justifyContent: "center",
                                              alignItems: "center",
                                              borderRadius: "100%",
                                              border: "1px #eee",
                                              minWidth: "36px",
                                              minHeight: "36px",
                                              display: "flex",
                                          }
                                }
                            >
                                {user.photo ? "" : <Icons.Avatar />}
                            </div>
                            <div className="user">{user.name}</div>
                        </div>
                    ) : (
                        <div className="cart" onClick={toAuth}>
                            <Icons.Avatar />
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 60px;
                    border-bottom: 1px solid #00000010;
                }
                .cart {
                    cursor: pointer;
                }

                .user {
                    display: flex;
                    align-items: center;
                }
                .categories {
                    display: flex;
                    width: 104px;
                    justify-content: space-between;
                }
                .actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-right: 200px;
                }
                .search {
                    cursor: pointer;
                }
                .men {
                    text-decoration: none;
                    color: #000;
                }
                .logo-nav {
                    text-decoration: none;
                    color: #000;
                    font-size: 28px;
                    margin-left: 200px;
                }
                a {
                    text-decoration: none;
                    position: relative;
                }
                .count {
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
                    z-index: 10;
                }

                @media (max-width: 1500px) {
                    .logo-nav {
                        margin-left: 100px;
                    }
                    .actions {
                        margin-right: 100px;
                    }
                }

                @media (max-width: 1200px) {
                    .logo-nav {
                        margin-left: 60px;
                    }
                    .actions {
                        margin-right: 60px;
                    }
                    .logo {
                        text-decoration: none;
                        color: #000;
                        font-size: 30px;
                        font-family: TimeBurner;
                    }
                }

                @media (max-width: 1000px) {
                    .logo-nav {
                        margin-left: 30px;
                    }
                    .actions {
                        margin-right: 30px;
                    }
                    .actions {
                        display: flex;
                        width: 90px;
                        justify-content: space-between;
                    }
                    .categories {
                        display: flex;
                        width: 100px;
                        justify-content: space-between;
                        font-size: 15px;
                    }
                }
                @media (max-width: 700px) {
                    .logo-nav {
                        margin-left: 15px;
                    }
                    .actions {
                        margin-right: 15px;
                    }
                }
                @media (max-width: 370px) {
                    .logo-nav {
                        margin-left: 15px;
                    }
                    .actions {
                        margin-right: 15px;
                    }
                }
            `}</style>
        </>
    )
}
