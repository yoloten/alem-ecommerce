import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

import Navbar from "../../../../components/Common/Navbar"
import CardGrid from "../../../../components/UI/CardGrid"
import CheckBox from "../../../../components/UI/CheckBox"

function index({ dataFromCategory, dataFromProduct, allSizes, allColors, query }: any) {
    const [showSub, setShowSub] = useState("")
    const [checked, setChecked]: any = useState({})
    const [checkedSizes, setCheckedSizes]: any = useState({})
    const [checkedColors, setCheckedColors]: any = useState({})
    const [targetCategory, setTargetCategory]: any = useState([])
    const [targetSizes, setTargetSizes]: any = useState([])
    const [targetColors, setTargetColors]: any = useState([])
    const [dataFromFilters, setDataFromFilters]: any = useState([])

    useEffect(() => {
        // const filterCategory = async () => {
    
        //     const result = await axios.post("http://localhost:8000/api/product/filters",
        //         {
        //             categories: targetCategory,
        //             sizes: targetSizes,
        //             colors: targetColors,
        //         },
        //     )

        //     setDataFromFilters(result.data)
        // }
        // if (targetCategory.length !== 0) {
        //     targetCategory.map((name: any, i: number) => {
        //         if (checked[name] === true) {
        //             if (i === 0) {
        //                 filterCategory()
        //             }
        //         }
        //     })
        // } else {
        //     setDataFromFilters([])
        // }
        // if (targetSizes.length !== 0) {
        //     targetSizes.map((name: any, i: number) => {
        //         if (checkedSizes[name] === true) {
        //             if (i === 0) {
        //                 filterCategory()
        //             }
        //         }
        //     })
        // } else {
        //     setDataFromFilters([])
        // }
        // if (targetColors.length !== 0) {
        //     targetColors.map((name: any, i: number) => {
        //         if (checkedColors[name] === true) {
        //             if (i === 0) {
        //                 filterCategory()
        //             }
        //         }
        //     })
        // } else {
        //     setDataFromFilters([])
        // }

    }, [checked, targetCategory, checkedSizes, targetSizes])

    const changeChecked = (event: any) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked })
        setTargetCategory([...targetCategory, parseInt(event.target.id, 10)])

        if (!event.target.checked) {
            setTargetCategory([...targetCategory.filter((item: any) => item !== parseInt(event.target.id, 10))])
        }
    }

    const changeCheckedSizes = (event: any) => {
        setCheckedSizes({ ...checkedSizes, [event.target.name]: event.target.checked })
        setTargetSizes([...targetSizes, parseInt(event.target.id, 10)])

        if (!event.target.checked) {
            setTargetSizes([...targetSizes.filter((item: any) => item !== parseInt(event.target.id, 10))])
        }
    }

    const changeCheckedColors = (event: any) => {
        setCheckedColors({ ...checkedColors, [event.target.name]: event.target.checked })
        setTargetColors([...targetColors, parseInt(event.target.id, 10)])

        if (!event.target.checked) {
            setTargetColors([...targetColors.filter((item: any) => item !== parseInt(event.target.id, 10))])
        }
    }
    
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
                                <div className="categories-header">Product Type</div>
                                {dataFromCategory.children.map((child: any, i: number) => (
                                    <div key={i} className="name">
                                        <CheckBox
                                            id={child.id}
                                            name={child.name}
                                            checked={checked[child.name]}
                                            onChange={changeChecked}
                                        />
                                        {child.name}
                                    </div>
                                ))}
                            </div>
                            <div className="sizes">
                                {allSizes.map((child: any, i: number) => (
                                    <div key={i} >
                                        <CheckBox
                                            id={child.id}
                                            name={child.name}
                                            checked={checkedSizes[child.name]}
                                            onChange={changeCheckedSizes}
                                        />
                                        {child.name}
                                    </div>
                                ))}
                            </div>
                            <div className="sizes">
                                {allColors.map((child: any, i: number) => (
                                    <div key={i} >
                                        <CheckBox
                                            id={child.id}
                                            name={child.name}
                                            checked={checkedColors[child.name]}
                                            onChange={changeCheckedColors}
                                        />
                                        {child.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {dataFromFilters.length === 0
                            ? <CardGrid content={dataFromProduct} />
                            : <CardGrid content={dataFromFilters} />
                        }
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
                width: 350px;
            }
            .categories{
                border: 1px solid grey
            }
            .name{
                display: flex;
                margin-left: 20px;
                cursor: pointer;
                margin-bottom: 10px;
                margin-right: 3px
            }
            .categories-header{
                margin-left: 20px;
                margin-top: 20px;
                margin-bottom: 20px;
                font-family: SegoeUIBold, serif
            }
            .sizes{
                border: 1px solid grey;
                display: flex;
                align-items: center;
                justify-content: space-around;
                margin-top: 40px
            }
        `}</style>
        </>
    )
}

index.getInitialProps = async ({ query }: any) => {
    const name = query.filters.split("-").map((item: any) => item.slice(0, 1).toUpperCase() + item.slice(1)).join(" ")

    const resFromProduct = await axios.get("http://localhost:8000/api/product/productbygender", {
        params: { gender: name },
    })

    const resFromCategory = await axios.get("http://localhost:8000/api/category/bygender", {
        params: { gender: name },
    })

    const allSizes = await axios.get("http://localhost:8000/api/size/all")
    const allColors = await axios.get("http://localhost:8000/api/color/all")

    return {
        dataFromCategory: resFromCategory.data,
        dataFromProduct: resFromProduct.data,
        allSizes: allSizes.data,
        allColors: allColors.data,
        query,
    }
}

export default index
