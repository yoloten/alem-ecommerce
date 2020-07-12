import * as Icons from "../../public/icons/_compiled"
import { slide as Menu } from "react-burger-menu"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import axios from "axios"

import { setInputWidth } from "../../utils/setInputWidth"
import RangeSlider from "../../components/UI/RangeSlider"
import Pagination from "../../components/UI/Pagination"
import Navbar from "../../components/Common/Navbar"
import CheckBox from "../../components/UI/CheckBox"
import Dropdown from "../../components/UI/Dropdown"
import Input from "../../components/UI/Input"

function index({ dataFromCategory, dataFromProduct, allFilters, query }: any): JSX.Element {
    const [isOpen, setIsOpen]: any = useState({})
    const [toFirstPage, setToFirstPage] = useState(false)
    const [index, setIndex] = useState(0)
    const [didMount, setDidMount] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [fields, setField]: any = useState(allFilters.map(() => ({})))
    const [category, setCategories]: any = useState(dataFromCategory.children.map(() => ""))
    const [price, setPrice]: any = useState([0, 2500])
    const [state, setState] = useState({
        products: dataFromProduct,
        filters: allFilters,
    })
    // console.log(state.products)
    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setDidMount(true)
    }, [])

    useEffect(() => {
        const postFilter = async () => {
            const newCategory = category.filter((i: any) => i !== "")

            if (newCategory.length === 0) {
                dataFromCategory.children.map((child: any) => newCategory.push(child.id))
            }

            try {
                const productsFromFilters = await axios.post("http://localhost:8000/api/product/filters", {
                    fields,
                    limit: 12,
                    category: newCategory,
                    price,
                    offset: 0,
                })

                setState((prev) => ({ ...prev, products: productsFromFilters.data }))
            } catch (error) {
                console.log(error)
            }
        }

        if (didMount) {
            postFilter()
            setToFirstPage(true)
            setIndex(0)
        }
    }, [fields, price, category])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions)

        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [])

    const getLastIndex = async (i: number) => {
        setIndex(index + i)
        setToFirstPage(false)

        try {
            const newCategory = category.filter((i: any) => i !== "")

            if (newCategory.length === 0) {
                dataFromCategory.children.map((child: any) => newCategory.push(child.id))
            }

            const productsFromFilters = await axios.post("http://localhost:8000/api/product/filters", {
                fields,
                limit: 12,
                category: newCategory,
                price,
                offset: index + i,
            })

            setState((prev) => ({ ...prev, products: [...state.products, ...productsFromFilters.data] }))
        } catch (error) {
            console.log(error)
        }
    }

    const updateDimensions = () => setWindowWidth(window.innerWidth)

    const onInput = (e: any) => {
        const newFields: any = [...fields]
        const { value, name, id, type } = e.target

        if (name.slice(-5) === "_enum") {
            const enumID = id.split(", ")

            if (!newFields[parseInt(id, 10)][name]) {
                newFields[parseInt(id, 10)][name] = []
            }

            const index = newFields[parseInt(enumID[0], 10)][name].indexOf(enumID[1])

            if (index === -1 && value !== "") {
                newFields[parseInt(enumID[0], 10)][name].push(value)
            } else {
                newFields[parseInt(enumID[0], 10)][name].splice(index, 1)
            }
        } else {
            newFields[parseInt(id, 10)][name] = type === "number" ? parseInt(value, 10) : value
        }

        setField([...newFields])
    }

    const onCategory = (event: any) => {
        const { id, value } = event.target
        const newCategory = [...category]

        newCategory[parseInt(id, 10)] = value
        setCategories(newCategory)
    }

    const onOpen = (e: any) => {
        const { id } = e.target
        const newIsOpen = { ...isOpen }

        if (!newIsOpen[id]) {
            newIsOpen[id] = true
        } else {
            newIsOpen[id] = false
        }

        setIsOpen(newIsOpen)
    }

    const showFilters = (
        <div className="filters-sidebar">
            <div className="filters-categories">
                <div className="filters-header" onClick={onOpen} id="PRODUCT TYPE">
                    PRODUCT TYPE
                    {isOpen["PRODUCT TYPE"] ? <Icons.ArrowDown /> : <Icons.ArrowRight />}
                </div>
                {dataFromCategory.children.length > 0 && isOpen["PRODUCT TYPE"]
                    ? dataFromCategory.children.map((child: any, i: number) => (
                          <div className="filters-name" key={child.uuid}>
                              <CheckBox
                                  id={i.toString()}
                                  value={child.id}
                                  checked={parseInt(category[i], 10) === child.id ? true : false}
                                  onChange={onCategory}
                                  width="20px"
                                  height="20px"
                              />
                              <div className="filters-childname">
                                  {child.name.slice(0, 1).toUpperCase() +
                                      child.name.slice(1).toLowerCase() +
                                      " (" +
                                      child.count +
                                      ")"}
                              </div>
                          </div>
                      ))
                    : ""}
            </div>

            <div className="filters-categories">
                <div className="filters-header" onClick={onOpen} id="PRICE">
                    PRICE RANGE
                    {isOpen["PRICE"] ? <Icons.ArrowDown /> : <Icons.ArrowRight />}
                </div>
                {isOpen["PRICE"] && (
                    <RangeSlider currency="USD" values={price} onChange={(value: any) => setPrice(value)} />
                )}
            </div>

            {state.filters.map((filter: any, i: number) => {
                if (filter.type === "enum") {
                    return (
                        <div className="filters-categories" key={filter.uuid}>
                            <div className="filters-header" onClick={onOpen} id={filter.name}>
                                {filter.name.toUpperCase()}
                                {isOpen[filter.name] ? <Icons.ArrowDown /> : <Icons.ArrowRight />}
                            </div>
                            {isOpen[filter.name] &&
                                filter.options.map((option: any) => {
                                    return (
                                        <div className="filters-name" key={option.uuid}>
                                            <CheckBox
                                                id={i.toString() + ", " + option.value}
                                                name={filter.name + "_enum"}
                                                value={option.value}
                                                checked={
                                                    Array.isArray(fields[i][filter.name + "_enum"]) &&
                                                    fields[i][filter.name + "_enum"].includes(option.value)
                                                        ? true
                                                        : false
                                                }
                                                onChange={onInput}
                                                width="20px"
                                                height="20px"
                                            />
                                            <div className="filters-childname">{option.label}</div>
                                        </div>
                                    )
                                })}
                        </div>
                    )
                }
                if (filter.type.toLowerCase() === "number") {
                    return (
                        <div key={filter.name + i} className="filters-categories">
                            <Input
                                type="number"
                                name={filter.name}
                                placeholder={filter.label}
                                id={i.toString()}
                                onChange={onInput}
                                borderRadius="1px"
                                height={40}
                                width={windowWidth <= 1370 ? 160 : 260}
                                bgColor="#fff"
                                border={false}
                                min={filter.validators && filter.validators.min ? filter.validators.min : undefined}
                                max={filter.validators && filter.validators.max ? filter.validators.max : undefined}
                            />
                        </div>
                    )
                }
                if (filter.type.toLowerCase() === "string") {
                    return (
                        <div key={filter.name + i} className="filters-categories">
                            <Input
                                key={i}
                                name={filter.name}
                                id={i.toString()}
                                type="text"
                                placeholder={filter.label}
                                borderRadius="1px"
                                onChange={onInput}
                                bgColor="#fff"
                                border={false}
                                height={40}
                                width={windowWidth < 1371 ? 170 : 270}
                            />
                        </div>
                    )
                }
            })}
        </div>
    )
    console.log(windowWidth)
    return (
        <div>
            <Navbar />
            <div className="filters">
                <div className="filters-routes">
                    <Link href="/">
                        <a className="filters-navigation">Home/</a>
                    </Link>
                    <Link
                        href={{
                            pathname: "/categories",
                            query: {
                                name: query.base.split("-")[0],
                                id: query.base.split("-")[1],
                            },
                        }}
                    >
                        <a className="category-navigation">{query.base.split("-")[0] + "/"}</a>
                    </Link>
                    <Link href="/filters" as={`/${query.category}`}>
                        <a className="filters-navigation">{query.category + "/"}</a>
                    </Link>
                    {/* <Link href="/p/[category]/[filters]" as={`/p/${query.category}/${query.filters}`}>
                        <a className="filters-navigation">{query.filters}</a>
                    </Link> */}
                </div>
                <div className="filters-content">
                    {windowWidth < 571 ? (
                        <Menu
                            className="filters-menu"
                            width="280px"
                            pageWrapId={"hidden"}
                            right
                            customBurgerIcon={<Icons.Filter />}
                            outerContainerId={"details-page"}
                            styles={{
                                ...{
                                    bmBurgerButton: {
                                        position: "fixed",
                                        left: windowWidth - 45 + "px",
                                        top: "80px",
                                    },
                                },
                                ...styles,
                            }}
                        >
                            {showFilters}
                        </Menu>
                    ) : (
                        showFilters
                    )}

                    <Pagination
                        getLastIndex={getLastIndex}
                        fromFilters={false}
                        items={state.products}
                        itemsPerPage={8}
                        toFirst={toFirstPage}
                    />
                </div>
            </div>
        </div>
    )
}

index.getInitialProps = async ({ query }: any) => {
    let products: any

    const resFromCategory = await axios.get("http://localhost:8000/api/category/forfilter", {
        params: { id: query.id },
    })

    if (resFromCategory.data.children.length > 0) {
        products = await axios.post("http://localhost:8000/api/product/filters", {
            fields: [],
            limit: 12,
            category: resFromCategory.data.children.map((item: any) => item.id),
            price: [],
            offset: 0,
        })
    }

    const allFilters = await axios.get("http://localhost:8000/api/product/attributes/allfilters")

    return {
        dataFromCategory: resFromCategory.data.length === 0 ? [] : resFromCategory.data,
        dataFromProduct: products.data.length === 0 ? [] : products.data,
        allFilters: allFilters.data.length === 0 ? [] : allFilters.data,
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
        marginTop: "-130px",
        position: "fixed",
        height: "100%",
        background: "#fff",
    },
    bmMenu: {},
    bmMorphShape: {
        fill: "#373a47",
    },
    bmItemList: {
        // color: "#b8b7ad",
    },
    bmItem: {
        display: "inline-block",
        outline: "none",
    },
    bmOverlay: {
        background: "transparent",
    },
}
