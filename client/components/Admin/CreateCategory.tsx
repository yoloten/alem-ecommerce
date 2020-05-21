import React, { useState, useEffect } from "react"
import { v4 } from "uuid"
import axios from "axios"

import AdminMainContent from "./AdminUI/AdminMainContent"
import Button from "../UI/Button"

export default function CreateCategory() {
    const [tree, setTree]: any = useState([])

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const allCategories = await axios.get("http://localhost:8000/api/category/all")

                if (allCategories.data && allCategories.data.length > 0) {
                    setTree(allCategories.data)
                } else {
                    setTree([{
                        value: "",
                        name: "",
                        uuid: v4(),
                        created_index: 0,
                        index: 0,
                        children: [],
                    }])
                }
            } catch (error) {
                setTree([{
                    value: "",
                    name: "",
                    uuid: v4(),
                    created_index: 0,
                    index: 0,
                    children: [],
                }])
            }
        }

        getAllCategories()
    }, [])

    const changeTree = (e: any) => {
        const { name, value, id } = e.target
        const newTree = [...tree]

        newTree[parseInt(id, 10)].name = value

        setTree(newTree)
    }

    const addChild = (e: any) => {
        e.preventDefault()
        const { id } = e.target
        const newTree = [...tree]
        const child = {
            name: "",
            parent: "",
            uuid: v4(),
            created_index: 0,
            index: 0,
            children: [],
        }

        if (id) {
            newTree.map((item: any, i: number) => {
                if (item.uuid === id) {
                    child.parent = item.uuid
                    newTree.splice(i + 1, 0, child)
                    child.created_index = newTree[i].created_index + 1
                    item.children.push(child.uuid)
                }
            })
        }

        setTree(newTree)
    }

    const deleteNode = async (e: any) => {
        e.preventDefault()
        const { id } = e.target
        const newTree = [...tree]
        const node = newTree[parseInt(id, 10)]

        newTree.map((item: any, i: number) => {
            if (item.uuid === node.parent) {
                item.children.map((child: any, index: number) => {
                    if (child === node.uuid) {
                        item.children.splice(index, 1)
                    }
                })
            }
        })

        newTree.splice(parseInt(id, 10), 1)
        setTree(newTree)

        await axios.delete("http://localhost:8000/api/category/delete", { data: { uuid: node.uuid } })
    }
    
    const submit = async (e: any) => {
        e.preventDefault()
        const treeForServer = [...tree]

        treeForServer.map((item: any, index: number) => item.index = index)

        await axios.post("http://localhost:8000/api/category/create", { tree: treeForServer })
    }

    return (
        <AdminMainContent>
            <div className="admin-title">Create Categories</div>
            <form className="admin-form" action="submit" onSubmit={submit}>
                {tree.map((node: any, index: number) => {
                    return <div
                        key={index}
                        className="input-item"
                        style={{ marginLeft: (node.created_index * 20) + "px" }}
                    >
                        <input
                            id={index.toString()}
                            name={node.name}
                            type="text"
                            onChange={changeTree}
                            placeholder={node.name}
                            value={node.name}
                            required
                        />
                        <Button
                            id={node.uuid}
                            onClick={addChild}
                            content="Add Child"
                        />
                        {node.parent && node.children.length < 1
                            ? <Button
                                id={index.toString()}
                                onClick={deleteNode}
                                content="Delete"
                            />
                            : ""
                        }
                    </div>
                })}
                <Button content="Save" />
            </form>
        </AdminMainContent>
    )
}
