import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

import Pagination from "../../components/UI/Pagination"
import Navbar from "../../components/Common/Navbar"

function index({ dataFromCategory, dataFromProduct, query }: any) {
    const [showSub, setShowSub] = useState("")
    const [count, setCount] = useState(0)
    
    const onShowSub = (e: any) => {
        // if (count === 0) {
        //     setShowSub(e.target.className.split(" ").slice(2, 4).join(" "))
        //     setCount(1)
        // } else {
        //     setShowSub(" ")
        //     setCount(0)
        // }
    }
    // console.log(dataFromCategory)
    return (
        <>
            <div>
                <Navbar />
                <div className="category">
                    {/* <div className="category-routes">
                        <Link href="/p/[category]" as={`/p/${query.category}`}>
                            <a className="category-navigation">{query.category + "/"}</a>
                        </Link>  
                    </div> */}
                    <div className="category-content">
                        <div className="category-filters">
                            <div className="category-categories">
                                {dataFromCategory.children.map((sub: any, i: number) => (
                                    <div key={sub.uuid}>
                                        <div className="category-parent">
                                            {sub.name.slice(0, 1).toUpperCase() + sub.name.slice(1)}
                                        </div>
                                        <div className="category-filters">
                                            {sub.children && sub.children.length > 0
                                                && sub.children.map((child: any) => (
                                                    <Link
                                                        key={child.uuid}
                                                        href={{
                                                            pathname: "/filters",
                                                            query: {
                                                                id: child.id,
                                                            }
                                                        }}
                                                        as={`/filters`}
                                                    >
                                                        <a className="category-name">
                                                            {child.name.slice(0, 1).toUpperCase() + child.name.slice(1)}
                                                        </a>
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="category-grid">
                            <div className="category-title">All</div>
                            <Pagination fromFilters={false} items={dataFromCategory.products} itemsPerPage={6}/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

index.getInitialProps = async ({ query }: any) => {

    const resFromCategory = await axios.get("http://localhost:8000/api/category/subcategories", {
        params: {
            parent: query.id,
        },
    })

    // const resFromProduct = await axios.get("http://localhost:8000/api/product/productbygender", {
    //     params: {
    //         parent: query.category,
    //     },
    // })
    return {
        dataFromCategory: resFromCategory.data
            ? resFromCategory.data
            : { children: [], products: [] },
        // dataFromProduct: resFromProduct.data,
        query,
    }
}

export default index
