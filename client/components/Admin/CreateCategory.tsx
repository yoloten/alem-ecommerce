import React, { useState, useEffect } from "react"
import { v4 } from "uuid"
import axios from "axios"

import AdminMainContent from "./AdminUI/AdminMainContent"
import Button from "../UI/Button"

export default function CreateCategory() {
    const [counter, setCounter] = useState(0)
    const [tree, setTree]: any = useState([{
        value: "",
        name: "",
        uuid: v4(),
        createdIndex: 0,
    }])

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
            createdIndex: 0,
        }

        if (id) {
            newTree.map((item: any, i: number) => {
                if (item.uuid === id) {
                    const parentIndex = newTree.indexOf(item)

                    child.parent = item.uuid
                    newTree.splice(i + 1, 0, child)
                    child.createdIndex = newTree[parentIndex].createdIndex + 1
                }
            })
        }

        setTree(newTree)
        setCounter(counter + 1)
    }
    console.log(tree)
    const submit = async (e: any) => {
        e.preventDefault()

        // await axios.post("http://localhost:8000/api/category/create", { tree })
    }

    return (
        <AdminMainContent>
            <div className="admin-title">Create Categories</div>
            <form className="admin-form" action="submit" onSubmit={submit}>
                {tree.map((node: any, index: number) => {
                    return <div
                        key={index}
                        className="input-item"
                        style={{ marginLeft: (node.createdIndex * 20) + "px" }}
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
                    </div>
                })}
                <Button content="Save" />
            </form>
            {tree.map((item: any, i: number) => {
                return <div style={{marginLeft: (item.createdIndex * 10) + "px"}}>{item.name}</div>
            })}
        </AdminMainContent>
    )
}
