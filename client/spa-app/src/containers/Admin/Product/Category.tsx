import { getAllCategories, deleteCategory, createOrEditCategory, Category } from "actions/admin/product/category"
import { addCategory, changeCategory, deleteSuccessMsg } from "reducers/admin/categoryReducer"
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import { RootState } from "reducers"
import { v4 } from "uuid"
import axios from "axios"

import * as Icons from "../../../../../common-components/icons"
import * as UI from "../../../../../common-components/src"
import AdminMainContent from "../UI/AdminMainContent"

export default function CreateCategory(): JSX.Element {
    const { categories, success } = useSelector((state: RootState) => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(deleteSuccessMsg())
        }, 3000)
    }, [success])

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    const changeTree = (e: any) => {
        const { value, id } = e.target

        dispatch(changeCategory({ id: parseInt(id, 10), value }))
    }

    const addChild = (e: any) => {
        e.preventDefault()
        const { id } = e.target
        const child: Category = {
            name: "",
            parents: [],
            uuid: v4(),
            created_index: 0,
            index: 0,
            children: [],
        }

        dispatch(addCategory({ id, child }))
    }

    const deleteNode = async (e: any) => {
        e.preventDefault()
        const { id } = e.currentTarget
        const node = categories[parseInt(id, 10)]

        dispatch(deleteCategory({ id: parseInt(id, 10), node }))
    }

    const submit = async (e: any) => {
        e.preventDefault()

        dispatch(createOrEditCategory(categories))
    }

    return (
        <AdminMainContent>
            <div className="admin-right-side">
                <div className="admin-title">Create Categories</div>
                <div className="admin-subtitle">Here you can create, edit and delete your categories</div>
                <form className="admin-form" action="submit" onSubmit={submit}>
                    {categories.map((node: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="input-item"
                                style={{ margin: "10px", marginLeft: node.created_index * 20 + "px" }}
                            >
                                <UI.Input
                                    onChange={changeTree}
                                    id={index.toString()}
                                    placeholder={`Level ${node.created_index + 1}`}
                                    borderRadius="3px"
                                    bgColor="#fff"
                                    border={true}
                                    width={250}
                                    height={31}
                                    type="text"
                                    name={node.name}
                                    value={node.name}
                                    required={true}
                                />
                                {node.created_index === 3 ? (
                                    ""
                                ) : (
                                    <UI.Button
                                        customStyleObject={{ alignSelf: "center", marginLeft: "10px" }}
                                        backgroundColor="#03a9f5"
                                        content="ADD CHILD"
                                        onClick={addChild}
                                        fontSize="11px"
                                        height="40px"
                                        id={node.uuid}
                                        type="button"
                                        width="80px"
                                        color="#fff"
                                    />
                                )}

                                {node.parents.length > 0 && node.children.length < 1 ? (
                                    <UI.Button
                                        id={index.toString()}
                                        onClick={deleteNode}
                                        backgroundColor="transparent"
                                        borderColor="#eee"
                                        width="30px"
                                        customStyleObject={{
                                            alignSelf: "center",
                                            marginLeft: "5px",
                                            zIndex: "10",
                                            position: "relative",
                                        }}
                                        content={<Icons.Trash style={{ zIndex: "-1", position: "relative" }} />}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        )
                    })}

                    <UI.Button
                        borderColor="#eee"
                        border={true}
                        backgroundColor="transparent"
                        content="SAVE CHANGES"
                        color="#92b967"
                        width="150px"
                        fontSize="13px"
                        customStyleObject={{ margin: "20px", marginLeft: "125px" }}
                    />
                    <div className="success">{success}</div>
                </form>
            </div>
            <div className="admin-left-side">
                <div className="admin-title">Info</div>
                <div className="admin-subtitle">Categories tree manipulations explanation</div>
                <div className="admin-title">Categories tree has 4 levels:</div>
                <ul>
                    <li className="admin-li">
                        <div className="admin-text">
                            <span className="admin-bold-span">Level 1: </span>
                            Root category.
                        </div>
                        <div className="admin-text">It will not be seen anywhere except database.</div>
                    </li>
                    <li className="admin-li">
                        <div className="admin-text">
                            <span className="admin-bold-span">Level 2: </span>
                            Categories that will be placed in the navigation bar.
                        </div>
                        <div className="admin-text">
                            Actually they are the main categories. For instance, you have got clothes shop. That shop
                            has clothes for men, women and kids. So that categories have to be seen to user from
                            everywhere. And that means users after navigation to one of those categories see categories
                            and content that belongs to it.
                        </div>
                    </li>
                    <li className="admin-li">
                        <div className="admin-text">
                            <span className="admin-bold-span">Level 3: </span>
                            Categories that will be seen after chosing any of the items from the level 2 categories.
                        </div>
                        <div className="admin-text">
                            Categories of this level will be seen on the sidebar after you chosing one of the level 2
                            categories. Level 3 categories will contain children categories that will have product.
                        </div>
                    </li>
                    <li className="admin-li">
                        <div className="admin-text">
                            <span className="admin-bold-span">Level 4: </span>
                            Last level. It will have products and it filterable
                        </div>
                        <div className="admin-text">
                            Take a look at example: We are openning Men(level 2). There will be categories such as Jeans
                            and T-shirts(level 3). When we click on one of them we see filters page with all level 4
                            categories that level 3 category has. We can filter products by chosing level 4 categories.
                            For instance, we chose Slim Jeans(level 4) and the result will be all products with that
                            category. So again level 4 categories will contain products. Only level 4 categories will be
                            seen in Create Product.
                            <div className="admin-text">
                                Short version of example: Men &#8594; Jeans &#8594; Slim Jeans
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </AdminMainContent>
    )
}
