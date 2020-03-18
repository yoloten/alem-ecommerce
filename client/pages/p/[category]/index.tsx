import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

import Pagination from "../../../components/UI/Pagination"
import Navbar from "../../../components/Common/Navbar"

function index({ dataFromCategory, dataFromProduct, query }: any) {
    const [showSub, setShowSub] = useState("")
    const [count, setCount] = useState(0)
    const [child, setChild] = useState()

    const onShowSub = (e: any) => {
        if (count === 0) {
            setShowSub(e.target.className.split(" ").slice(2, 4).join(" "))
            setCount(1)
        } else {
            setShowSub(" ")
            setCount(0)
        }
    }
    
    return (
        <>
            <div>
                <Navbar />
                <div className="category">
                    <div className="category-routes">
                        <Link href="/p/[category]" as={`/p/${query.category}`}>
                            <a className="category-navigation">{query.category + "/"}</a>
                        </Link>  
                    </div>
                    <div className="category-content">
                        <div className="category-filters">
                            <div className="category-categories">
                                {dataFromCategory.children.map((sub: any, i: number) => (
                                    <div className={`parent ${sub.name}`} onClick={onShowSub} key={i}>
                                        {<Link href="/p/[category]/[filters]" as={`/p/${query.category}/${sub.name}`}>
                                            <a className="category-name">{sub.name}</a>
                                        </Link>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="category-grid">
                            <div className="category-title">All</div>
                            <Pagination fromFilters={false} items={dataFromProduct} itemsPerPage={6}/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

index.getInitialProps = async ({ query }: any) => {

    const resFromCategory = await axios.get("http://localhost:8000/api/category/bygender", {
        params: {
            gender: query.category,
        },
    })

    const resFromProduct = await axios.get("http://localhost:8000/api/product/productbygender", {
        params: {
            gender: query.category,
        },
    })
    return {
        dataFromCategory: resFromCategory.data,
        dataFromProduct: resFromProduct.data,
        query,
    }
}

export default index
