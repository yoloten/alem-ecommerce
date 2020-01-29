import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

import RangeSlider from "../../../../components/UI/RangeSlider"
import Pagination from "../../../../components/UI/Pagination"
import Navbar from "../../../../components/Common/Navbar"
import CheckBox from "../../../../components/UI/CheckBox"
import Dropdown from "../../../../components/UI/Dropdown"

function index({ dataFromCategory, dataFromProduct, allSizes, allColors, query }: any) {
    const [showSub, setShowSub] = useState("")
    const [checked, setChecked]: any = useState({})
    const [checkedSizes, setCheckedSizes]: any = useState({})
    const [checkedColors, setCheckedColors]: any = useState({})
    const [targetCategory, setTargetCategory]: any = useState([])
    const [targetSizes, setTargetSizes]: any = useState([])
    const [targetColors, setTargetColors]: any = useState([])
    const [dataFromFilters, setDataFromFilters]: any = useState([])
    const [limit, setLimit]: any = useState(30)
    const [sort, setSort]: any = useState("price DESC")
    const [price, setPrice]: any = useState([0, 500])
    const [initialState] = useState({
        colors: Array.from(new Set(dataFromProduct.map((i: any) => i.colors.map((j: any) => j.id)).flat())),
        sizes: Array.from(new Set(dataFromProduct.map((i: any) => i.sizes.map((j: any) => j.id)).flat())),
        categories: dataFromCategory.children.map((child: any) => child.id),
        limit: 10,
        offset: 0,
        price,
    })

    useEffect(() => {
        const filterCategory = async () => {
            const result = await axios.post("http://localhost:8000/api/product/filters",
                {
                    categories: targetCategory.length === 0 ? initialState.categories : targetCategory,
                    colors: targetColors.length === 0 ? initialState.colors : targetColors,
                    sizes: targetSizes.length === 0 ? initialState.sizes : targetSizes,
                    min: price[0],
                    max: price[1],
                    order: sort,
                    offset: 0,
                    limit,
                },
            )

            setDataFromFilters(result.data)
        }

        if (targetCategory.length !== 0) {
            targetCategory.map((id: any, i: number) => {
                if (checked[id] === true) {
                    if (i === 0) {
                        filterCategory()
                    }
                }
            })
        } else {
            if (targetSizes.length === 0 && targetColors.length === 0) {
                filterCategory()
            }
            setDataFromFilters([])
        }

        if (targetSizes.length !== 0) {
            targetSizes.map((id: any, i: number) => {
                if (checkedSizes[id] === true) {
                    if (i === 0) {
                        filterCategory()
                    }
                }
            })
        } else {
            setDataFromFilters([])
        }

        if (targetColors.length !== 0) {
            targetColors.map((id: any, i: number) => {
                if (checkedColors[id] === true) {
                    if (i === 0) {
                        filterCategory()
                    }
                }
            })
        } else {
            setDataFromFilters([])
        }
    }, [checked, targetCategory, checkedSizes, targetSizes, targetColors, checkedColors, limit, price, sort])

    const changeChecked = (event: any) => {
        setChecked({ ...checked, [event.target.id]: event.target.checked })
        setTargetCategory([...targetCategory, parseInt(event.target.id, 10)])
       
        if (!event.target.checked) {
            setTargetCategory([...targetCategory.filter((item: any) => item !== parseInt(event.target.id, 10))])
        }
    }

    const changeCheckedSizes = (event: any) => {
        setCheckedSizes({ ...checkedSizes, [event.target.id]: event.target.checked })
        setTargetSizes([...targetSizes, parseInt(event.target.id, 10)])

        if (!event.target.checked) {
            setTargetSizes([...targetSizes.filter((item: any) => item !== parseInt(event.target.id, 10))])
        }
    }

    const changeCheckedColors = (event: any) => {
        setCheckedColors({ ...checkedColors, [event.target.id]: event.target.checked })
        setTargetColors([...targetColors, parseInt(event.target.id, 10)])

        if (!event.target.checked) {
            setTargetColors([...targetColors.filter((item: any) => item !== parseInt(event.target.id, 10))])
        }
    }

    const onLimit = (event: any) => {
        setLimit(parseInt(event.target.value, 10))
    }

    const onSort = (event: any) => {
        setSort(event.target.value)
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
                        <Link href="/p/[category]/[filters]" as={`/p/${query.category}/${query.filters}`}>
                            <a className="navigation">{query.filters}</a>
                        </Link> 
                    </div>
                    <div className="content">
                        <div className="filters">
                            <div className="categories">
                                <div className="categories-header">Product Type</div>
                                {dataFromCategory.children.map((child: any, i: number) => (
                                    <div key={i} className="categories-name name">
                                        <CheckBox
                                            id={child.id}
                                            name={child.name}
                                            checked={checked[child.id]}
                                            onChange={changeChecked}
                                        />
                                        <div className="childname">{child.name}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="sizes">
                                <div className="categories-header">Price</div>
                                <RangeSlider price={price} onChange={(value: any) => setPrice(value)} />
                            </div>
                            <div className="sizes">
                                <div className="categories-header">Size</div>
                                <div className="size-items">
                                    {allSizes.map((child: any, i: number) => (
                                        <div key={i} className="name">
                                            <CheckBox
                                                id={child.id}
                                                name={child.name}
                                                checked={checkedSizes[child.id]}
                                                onChange={changeCheckedSizes}
                                                dataType="size"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="sizes">
                                <div className="categories-header">Color</div>
                                <div className="size-items">
                                    {allColors.map((child: any, i: number) => (
                                        <div key={i} className="name">
                                            <CheckBox
                                                id={child.id}
                                                name={child.name}
                                                checked={checkedColors[child.id]}
                                                onChange={changeCheckedColors}
                                                dataType="color"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="content-main">
                            <div className="header">
                                <div className="title">Men's Top</div>
                                <div className="sort">
                                    <div className="limit">
                                        <div className="limit-title">Show products:</div>
                                        <Dropdown
                                            value={limit}
                                            width={100}
                                            onChange={onLimit}
                                            options={[{ val: 10 }, { val: 20 }, { val: 30 }, { val: 50 }]}
                                        />
                                    </div>
                                    <div className="limit">
                                        <div className="limit-title">Sort:</div>
                                        <Dropdown
                                            value={"price DESC"}
                                            width={150}
                                            onChange={onSort}
                                            options={[{ val: "price ASC" }, { val: "price DESC" }]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Pagination fromFilters={true} items={dataFromFilters} itemsPerPage={3} />
                        </div>
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
                border: 1px solid #d9d9d9
            }
            .name{
                display: flex;
                cursor: pointer;
                align-items: center;
                margin-right: 3px;
                margin-bottom: 20px;
            }
            .categories-name{
                margin-left: 20px;
            }
            .categories-header{
                margin-left: 20px;
                margin-top: 20px;
                margin-bottom: 20px;
                font-family: SegoeUIBold, serif
            }
            .sizes{
                border: 1px solid #d9d9d9;
               
                margin-top: 40px;
                flex-direction: column;
            }
            .size-items{
                display: flex;
                align-items: center;
                margin-left: 20px;
            }
            .content-main{
                width: 77%
            }
            .header{
                display: flex;
                justify-content: space-between;
            }
            .title{
                font-size: 29px;
                margin-left: 2.8vw
            }
            .sort{
                display: flex;
                justify-content: space-between;
                width: 480px; 
            }
            .limit{
                display: flex;
                align-items: center;
            }
            .childname{
                margin-left: 10px
            }
            .limit-title{
                margin-right: 5px;
                font-family: SegoeUIBold
            }
            .navigation{
                text-decoration: none;
                color: #000
            }
        `}</style>
        </>
    )
}

index.getInitialProps = async ({ query }: any) => {
    const name = query.filters.split("-").map((item: any) => item.slice(0, 1).toUpperCase() + item.slice(1)).join(" ")

    const resFromCategory = await axios.get("http://localhost:8000/api/category/bygender", { params: { gender: name } })
    const products = await axios.get("http://localhost:8000/api/product/productbygender", { params: { gender: name } })
    const allColors = await axios.get("http://localhost:8000/api/color/all")
    const allSizes = await axios.get("http://localhost:8000/api/size/all")
   
    return {
        dataFromCategory: resFromCategory.data,
        dataFromProduct: products.data,
        allSizes: allSizes.data,
        allColors: allColors.data,
        query,
    }
}

export default index
