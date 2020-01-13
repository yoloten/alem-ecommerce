// import { useRouter } from "next/router"
import Navbar from "../components/Common/Navbar"
import { useState, useEffect } from "react"
import axios from "axios"

function filters({ data }: any) {
    const [showSub, setShowSub] = useState("")
    const [count, setCount] = useState(0)
    const [child, setChild] = useState()
    console.log(data)
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
    // console.log(showSub)
    
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
                                {data.children.map((sub: any, i: number) => (
                                    count === 0 ? <div className={`parent ${sub.name}`} onClick={onShowSub} key={i}>
                                        {sub.name}
                                    </div> : ""
                                ))}
                            </div>
                        </div>
                        <div className="items">Items</div>
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
                width: 300px
            }
            .parent{
                cursor: pointer;
                margin-bottom: 10px
            }
            .sub{
                cursor: pointer;
                margin-top: 10px;
                margin-left: 20px
            }
        `}</style>
        </>
    )
}

filters.getInitialProps = async ({ query }: any) => {

    const res = await axios.get("http://localhost:8000/api/category/onebygender", {
        params: {
            name: query.category,
        },
    })

    return { data: res.data }
}

export default filters