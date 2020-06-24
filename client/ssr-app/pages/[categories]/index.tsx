import React, { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

import Pagination from "../../components/UI/Pagination"
import Navbar from "../../components/Common/Navbar"

function index({ dataFromCategory, dataFromProduct, query }: any): JSX.Element {
    const [products, setProducts] = useState(dataFromCategory.products)
    const [showSub, setShowSub] = useState("")
    const [index, setIndex] = useState(0)

    const getLastIndex = (i: number) => {
        setIndex(i)
    }
    console.log(products)
    useEffect(() => {
        if (index > 0) {
            const getNewChunksOfData = async () => {
                const resFromCategory = await axios.get(
                    "http://localhost:8000/api/category/subcategoriesandallproducts",
                    {
                        params: {
                            parent: query.id,
                            offset: index,
                        },
                    },
                )

                if (resFromCategory.data.products.length > 0) {
                    setProducts([...products, ...resFromCategory.data.products])
                }
            }

            getNewChunksOfData()
        }
    }, [index])

    return (
        <div>
            <Navbar />
            <div className="category">
                <div className="category-routes">
                    <Link href="/p/[category]" as={`/p/${query.categories}`}>
                        <a className="category-navigation">{query.categories + "/"}</a>
                    </Link>
                </div>
                <div className="category-content">
                    <div className="category-filters">
                        <div className="category-categories">
                            <div className="category-parent">Categories</div>
                            {dataFromCategory.children.map((sub: any, i: number) => (
                                <div key={sub.uuid}>
                                    <div className="category-filters">
                                        {
                                            <Link
                                                key={sub.uuid}
                                                href={{
                                                    pathname: "/filters",
                                                    query: {
                                                        id: sub.id,
                                                    },
                                                }}
                                            >
                                                <a className="category-name">
                                                    {sub.name.slice(0, 1).toUpperCase() + sub.name.slice(1)}
                                                </a>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="category-grid">
                        <div className="category-title">All</div>
                        <Pagination getLastIndex={getLastIndex} fromFilters={false} items={products} itemsPerPage={6} />
                    </div>
                </div>
            </div>
        </div>
    )
}

index.getInitialProps = async ({ query }: any) => {
    const resFromCategory = await axios.get("http://localhost:8000/api/category/subcategoriesandallproducts", {
        params: {
            parent: query.id,
            offset: 0,
        },
    })

    return {
        dataFromCategory: resFromCategory.data ? resFromCategory.data : { children: [], products: [] },
        query,
    }
}

export default index
