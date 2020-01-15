// import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

import Navbar from "../../../components/Common/Navbar"
import CardGrid from "../../../components/UI/CardGrid"

function index({ dataFromCategory, dataFromProduct, query }: any) {
    const [showSub, setShowSub] = useState("")
    const [count, setCount] = useState(0)
    const [child, setChild] = useState()

    // useEffect(() => {
    //     if (showSub !== " ") {
    //         setChild(getConutOfProducts(showSub))
    //         console.log(showSub)
    //     }
    // }, [showSub])

    // const getConutOfProducts = async (str: string) => {
    //     await axios.get("http://localhost:8000/api/category/onebyparent", {
    //     params: {
    //         name: str,
    //     },
    // })
    // }

    const onShowSub = (e: any) => {
        if (count === 0) {
            setShowSub(e.target.className.split(" ").slice(2, 4).join(" "))
            setCount(1)
        } else {
            setShowSub(" ")
            setCount(0)
        }
        // console.log(e.target.children)
    }
    const subClick = (e: any) => {
        e.stopPropagation()

    }
    // const router = useRouter()
    console.log(dataFromProduct)
    return (
        <>
            <div>
                <Navbar />
                <div className="main">
                    <div className="routes">
                        {`Men/${showSub}`}
                    </div>
                    <div className="content">
                        <div className="filters">
                            <div className="categories">
                                {dataFromCategory.children.map((sub: any, i: number) => (
                                    <div className={`parent ${sub.name}`} onClick={onShowSub} key={i}>
                                        {<Link href="/p/[category]/[filters]" as={`/p/${query.category}/${sub.name.toLowerCase().split(" ").join("-")}`}>
                                            <a className="name">{sub.name}</a>
                                        </Link>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <CardGrid content={dataFromProduct} />
                    </div>

                </div>
            </div>
            <style jsx>{`
            .main{
                border-top: 1px solid #d9d9d9;
                margin-top: 20px;
                padding-left: 170px;
                padding-right: 170px;
            }
            .content{
                display: flex;
                margin-top: 40px
            }
            .items{
                width: 100%;
                padding-left: 40px;
            }
            .filters{
                width: 350px
            }
            .parent{
                cursor: pointer;
                margin-bottom: 10px
            }
            .name{
                text-decoration: none;
                color: #000
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
