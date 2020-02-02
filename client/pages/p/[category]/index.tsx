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
                <div className="main">
                    <div className="routes">
                        <Link href="/p/[category]" as={`/p/${query.category}`}>
                            <a className="navigation">{query.category + "/"}</a>
                        </Link>  
                    </div>
                    <div className="content">
                        <div className="filters">
                            <div className="categories">
                                {dataFromCategory.children.map((sub: any, i: number) => (
                                    <div className={`parent ${sub.name}`} onClick={onShowSub} key={i}>
                                        {<Link href="/p/[category]/[filters]" as={`/p/${query.category}/${sub.name}`}>
                                            <a className="name">{sub.name}</a>
                                        </Link>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid">
                            <div className="title">All</div>
                            <Pagination fromFilters={false} items={dataFromProduct} itemsPerPage={6}/>
                        </div>
                    </div>

                </div>
            </div>
            <style jsx>{`
            .main{
                border-top: 1px solid #d9d9d9;
                
                padding-left: 170px;
                padding-right: 170px;
            }
            .content{
                display: flex;
                margin-top: 40px;
            }
            .items{
                width: 100%;
                padding-left: 40px;
            }
            .filters{
                min-width: 310px;
            }
            .parent{
                cursor: pointer;
                margin-bottom: 10px
            }
            .name{
                text-decoration: none;
                color: #000
            }
            .grid{
                dispaly: flex;
                flex-direction: column;
                align-self: flex-start
            }
            .title{
                font-size: 29px;
                margin-left: 2.85vw;
                font-family: 'PoppinsSemiBold', serif;
            }
            .navigation{
                text-decoration: none;
                color: #000
            }
            .routes{
                margin-top: 10px
            }
        `}</style>
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
