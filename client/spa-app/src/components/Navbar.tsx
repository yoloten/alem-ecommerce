import React, { useState, useEffect } from "react"
import { Link, useCurrentRoute } from "react-navi"
import { navigation } from "containers/Navigation"
import axios from "axios"

import * as Icons from "../../../common-components/icons"

interface Props {
    landing?: boolean
    data?: string
    removeData?: string
}

export default function Navbar(props: Props): JSX.Element {
    const [count, setCount]: any = useState(0)
    const [categories, setCategories] = useState([])

    useEffect(() => {
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

    return (
        <div className="navbar">
            <Link href="/" className="logo-nav">
                älem
            </Link>
            <div className="categories">
                {categories.map((category: any) => {
                    return (
                        <Link
                            key={category.name}
                            className="men"
                            href={{
                                pathname: `/[categories]?id=${category.id}`,
                            }}
                        >
                            {category.name.slice(0, 1).toUpperCase() + category.name.slice(1).toLowerCase()}
                        </Link>
                    )
                })}
            </div>
            <div className="actions">
                <div className="search">
                    <Icons.Search />
                </div>
                <Link href="/user/cart" className="cart">
                    <Icons.Cart color="#000000" />
                    {count !== 0 ? (
                        <div className="count">{count > 1000 ? Math.floor(count / 1000) + "k" : count}</div>
                    ) : (
                        ""
                    )}
                </Link>
                <Link href="/auth/login">
                    <Icons.Avatar />
                </Link>
            </div>
        </div>
    )
}
