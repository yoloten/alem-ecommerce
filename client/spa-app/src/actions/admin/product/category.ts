import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { v4 } from "uuid"

export interface Category {
    created_index: number
    children: any[]
    parents: any[]
    value?: string
    index: number
    name: string
    uuid: string
    id?: number
}

export const getLastLevelCategories = createAsyncThunk("product/getLastCategories", async () => {
    try {
        const result = await axios.get("http://localhost:8000/api/category/last")

        if (result.data && result.data.msg !== "No category") {
            const categories: Category[] = result.data

            return categories
        } else {
            return []
        }
    } catch (err) {
        return err
    }
})

export const getAllCategories = createAsyncThunk("product/getAllCategories", async () => {
    try {
        const result = await axios.get("http://localhost:8000/api/category/all")

        if (result.data.msg !== "No category") {
            const categories: Category[] = result.data

            return categories
        } else {
            const category: Category[] = [
                {
                    value: "",
                    name: "",
                    uuid: v4(),
                    created_index: 0,
                    index: 0,
                    children: [],
                    parents: [],
                },
            ]

            return category
        }
    } catch (err) {
        return err
    }
})

export const deleteCategory = createAsyncThunk<any, any, any>(
    "product/deleteCategory",
    async (data: { id: number; node: Category }, { rejectWithValue }) => {
        try {
            await axios.delete("http://localhost:8000/api/category/delete", { data: { uuid: data.node.uuid } })
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)

export const createOrEditCategory = createAsyncThunk<any, any, any>(
    "product/createOrEditCategory",
    async (tree: Category[], { rejectWithValue }) => {
        try {
            const created = await axios.post("http://localhost:8000/api/category/create", { tree })

            return created.data.success
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)
