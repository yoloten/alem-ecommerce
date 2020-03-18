import * as Icons from "../../../../public/icons/_compiled"
import { slide as Menu } from "react-burger-menu"
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
        colors: dataFromProduct.length > 0 && typeof dataFromProduct !== "string"
            ? Array.from(new Set(dataFromProduct.map((i: any) => i.colors.map((j: any) => j.id)).flat()))
            : [],
        sizes: dataFromProduct.length > 0 && typeof dataFromProduct !== "string"
            ? Array.from(new Set(dataFromProduct.map((i: any) => i.sizes.map((j: any) => j.id)).flat()))
            : [],
        categories: dataFromCategory.children.map((child: any) => child.id),
        limit: 10,
        offset: 0,
        price,
    })
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions)

        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [])

    const updateDimensions = () => setWindowWidth(window.innerWidth)

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

    const showSort = (
        <div className="sort">
            <div className="sort-item" >
                {windowWidth > 571 ? <div className="sort-header">Show products:</div> : ""}
                <Dropdown
                    value={limit}
                    width={100}
                    onChange={onLimit}
                    options={[{ val: 10 }, { val: 20 }, { val: 30 }, { val: 50 }]}
                />
            </div>
            <div className="sort-item">
                {windowWidth > 571 ? <div className="sort-header">Sort:</div> : ""}
                <Dropdown
                    value={"price DESC"}
                    width={150}
                    onChange={onSort}
                    options={[{ val: "price ASC" }, { val: "price DESC" }]}
                />
            </div>
        </div>
    )

    const showFilters = (
        <div className="filters">
            <div className="filters-categories">
                <div className="filters-categories-header">
                    Product Type
                    </div>
                {dataFromCategory.children.map((child: any, i: number) => (
                    <div className="filters-name" key={i} style={{ marginLeft: "20px" }}>
                        <CheckBox
                            id={child.id}
                            name={child.name}
                            checked={checked[child.id]}
                            onChange={changeChecked}
                            width="26px"
                            height="26px"
                        />
                        <div className="filters-childname">{child.name}</div>
                    </div>
                ))}
            </div>

            <div className="filters-sizes">
                <div className="filters-categories-header">Price</div>
                <RangeSlider price={price} onChange={(value: any) => setPrice(value)} />
            </div>
            <div className="filters-sizes">
                <div className="filters-categories-header">Size</div>
                <div className="filters-sizes-items">
                    {allSizes.map((child: any, i: number) => (
                        <div key={i} className="filters-name">
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
            <div className="filters-sizes">
                <div className="filters-categories-header">Color</div>
                <div className="filters-sizes-items">
                    {allColors.map((child: any, i: number) => (
                        <div key={i} className="filters-name">
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
    )

    return (
        <div>
            <Navbar />
            <div className="filters-main">
                <div className="routes">
                    <Link href="/p/[category]" as={`/p/${query.category}`}>
                        <a className="navigation">{query.category + "/"}</a>
                    </Link>
                    <Link href="/p/[category]/[filters]" as={`/p/${query.category}/${query.filters}`}>
                        <a className="navigation">{query.filters}</a>
                    </Link>
                </div>
                <div className="content">
                    {windowWidth < 571
                        ?
                        <Menu
                            className="menu"
                            width="280px"
                            pageWrapId={"hidden"}
                            right
                            customBurgerIcon={<Icons.Filter />}
                            outerContainerId={"details-page"}
                            styles={{
                                ...{
                                    bmBurgerButton: {
                                        position: "fixed",
                                        left: (windowWidth - 45) + "px",
                                        top: "130px",
                                    },
                                }, ...styles,
                            }}
                        >
                            {showSort}
                            {showFilters}
                        </Menu>
                        : showFilters
                    }
                    <div className="content-main">
                        <div className="header">
                            <div className="title">Men's Top</div>
                            {windowWidth < 571
                                ? ""
                                : showSort
                            }
                        </div>
                        <Pagination fromFilters={true} items={dataFromFilters} itemsPerPage={6} />
                    </div>
                </div>
            </div>
        </div>
    )
}

index.getInitialProps = async ({ query }: any) => {
    const resFromCategory = await axios.get("http://localhost:8000/api/category/bygender",
        {
            params: { gender: query.filters },
        })
    const products = await axios.get("http://localhost:8000/api/product/productbygender",
        {
            params: { gender: query.filters },
        })
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

const styles = {
    bmBurgerBars: {
        background: "#373a47",
    },
    bmBurgerBarsHover: {
        background: "#a90000",
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
        top: "-5px",
    },
    bmCross: {
        background: "#bdc3c7",
    },
    bmMenuWrap: {
        marginTop: "-110px",
        position: "fixed",
        height: "100%",
        background: "#fff",
    },
    bmMenu: {

    },
    bmMorphShape: {
        fill: "#373a47",
    },
    bmItemList: {
        // color: "#b8b7ad",
        padding: "20px",
    },
    bmItem: {
        display: "inline-block",
    },
    bmOverlay: {
        background: "transparent",
    },
}
