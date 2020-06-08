import { getAdminProductsList, deleteAdminItemFromList } from "actions/admin/product/product"
import { getLastLevelCategories } from "actions/admin/product/category"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { RootState } from "reducers"
import { Link } from "react-navi"
import axios from "axios"

import * as Icons from "../../../../../common-components/icons"
import * as UI from "../../../../../common-components/src/"
import AdminMainContent from "../UI/AdminMainContent"

export default function ProductsList(): JSX.Element {
    const [sort] = useState([
        { label: "By creation time desc", value: "product.created_at DESC" },
        { label: "By creation time asc", value: "product.created_at ASC" },
        { label: "By discount desc", value: "pricing.discount DESC" },
        { label: "By discount asc", value: "pricing.discount ASC" },
        { label: "By price desc", value: "pricing.price DESC" },
        { label: "By price asc", value: "pricing.price ASC" },
        { label: "By sold desc", value: "product.sold DESC" },
        { label: "By sold asc", value: "product.sold ASC" },
    ])
    const [filters, setFilters] = useState({
        search: "",
        sortBy: "",
        category: "",
    })

    const { product, category } = useSelector((state: RootState) => state)
    const { productsList } = product
    const { lastLevelCategories } = category

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLastLevelCategories())
    }, [])

    useEffect(() => {
        dispatch(
            getAdminProductsList({
                category: filters.category,
                search: filters.search,
                sortBy: filters.sortBy,
            }),
        )
    }, [filters])

    const filtersChange = (e: any) => {
        e.persist()
        setFilters((state: any) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const deleteItem = async (e: any) => {
        const { id } = e.target
        dispatch(deleteAdminItemFromList(parseInt(id, 10)))
    }

    return (
        <div>
            <AdminMainContent>
                <div className="products-list">
                    <div className="admin-title">Products List</div>
                    <div className="products-list-filters">
                        <UI.Input
                            icon={<Icons.Search />}
                            className="products-list-input"
                            onChange={filtersChange}
                            borderRadius="3px"
                            bgColor="#fff"
                            border={true}
                            width={150}
                            height={31}
                            type="text"
                            name="search"
                            borderColor="#d5d5d5"
                            // value={mainProperties.name}
                            required={true}
                            id="input"
                        />
                        <UI.Dropdown
                            onChange={filtersChange}
                            className="products-list-input"
                            value={filters.sortBy}
                            options={sort}
                            borderRadius="3px"
                            borderColor="#d5d5d5"
                            bgColor="#fff"
                            border={true}
                            width={155 + 30}
                            height={30}
                            name="sortBy"
                            placeholder="Sort by"
                            required={true}
                            id="dropdown"
                        />
                        <UI.Dropdown
                            onChange={filtersChange}
                            className="products-list-input"
                            value={filters.category}
                            options={lastLevelCategories}
                            borderRadius="3px"
                            borderColor="#d5d5d5"
                            bgColor="#fff"
                            border={true}
                            width={155 + 30}
                            height={30}
                            name="category"
                            placeholder="By category"
                            required={true}
                            id="dropdown"
                        />
                    </div>
                    <div className="table table-admin">
                        <div className="table-titles">
                            <div className="table-title-product">Name</div>
                            <div className="table-title-attribute">Category</div>
                            <div className="table-title-attribute">Price</div>
                            <div className="table-title-attribute">Discount</div>
                            <div className="table-title-attribute">Amount</div>
                            <div className="table-title-attribute">Sold</div>
                            {/* <div className="table-title-attribute">Price</div> */}
                            <div className="table-title-remove"></div>
                            <div className="table-title-remove"></div>
                        </div>
                        <div className="table-content">
                            {productsList.length > 0 &&
                                productsList.map((product: any, i: number) => {
                                    if (product) {
                                        return (
                                            <div key={i} className="table-product">
                                                <div className="table-product-name">{product.name}</div>
                                                <div className="table-product-attribute">{product.category_name}</div>
                                                <div className="table-product-attribute">
                                                    {`${product.price} ${product.currency}`}
                                                </div>
                                                <div className="table-product-attribute">
                                                    {(parseFloat(product.discount) * 100).toFixed(2) + "%"}
                                                </div>
                                                <div className="table-product-attribute">{product.count}</div>
                                                <div className="table-product-attribute">{product.sold}</div>
                                                <Link
                                                    style={{ marginTop: "4px" }}
                                                    href={{
                                                        pathname: "/admin/product/edit",
                                                        query: {
                                                            id: product.id,
                                                        },
                                                    }}
                                                >
                                                    <Icons.Edit />
                                                </Link>
                                                <UI.Button
                                                    id={product.id}
                                                    onClick={deleteItem}
                                                    backgroundColor="transparent"
                                                    borderColor="#eee"
                                                    width="30px"
                                                    customStyleObject={{
                                                        zIndex: "10",
                                                        position: "relative",
                                                    }}
                                                    content={
                                                        <Icons.Trash
                                                            style={{
                                                                zIndex: "-1",
                                                                position: "relative",
                                                                marginLeft: "1px",
                                                            }}
                                                        />
                                                    }
                                                />
                                            </div>
                                        )
                                    }
                                })}
                        </div>
                    </div>
                </div>
            </AdminMainContent>
        </div>
    )
}
