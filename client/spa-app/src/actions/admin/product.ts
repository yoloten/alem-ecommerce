import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { v4 } from "uuid"

export interface Category {
    value?: string
    name: string
    parents: any[]
    uuid: string
    created_index: number
    index: number
    children: any[]
}

export interface Options {
    name: string
    label: string
    value: string
    meta?: Record<string, string | number>
    uuid: string
}

export interface Macro {
    label: string
    name: string
    type: string
    validators: Record<string, string | number>
    options: Options[]
    validatorsList: string[]
    uuid: string
}

export const getAdminProductsList = createAsyncThunk<any, any, any>(
    "product/list",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8000/api/product/list", { params })
            return response.data
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)

export const deleteAdminItemFromList = createAsyncThunk<any, any, any>(
    "product/deleteFromList",
    async (id: number, { rejectWithValue }) => {
        try {
            await axios.delete("http://localhost:8000/api/product/deleteone", { data: { id } })
            return id
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)

export const getLastLevelCategories = createAsyncThunk("product/getLastCategories", async () => {
    try {
        const result = await axios.get("http://localhost:8000/api/category/last")
        return result.data
    } catch (err) {
        return err
    }
})

export const getAllCategories = createAsyncThunk("product/getAllCategories", async () => {
    try {
        const result = await axios.get("http://localhost:8000/api/category/all")
        const categories: Category[] = result.data

        if (categories && categories.length > 0) {
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

export const getAllMacros = createAsyncThunk("product/getAllMacros", async () => {
    try {
        const result = await axios.get("http://localhost:8000/api/product/allmacros")
        const macros: Macro[] = result.data

        return macros
    } catch (err) {
        return err
    }
})

export const createMacros = createAsyncThunk("product/createMacros", async (macros: Macro[]) => {
    try {
        const result = await axios.post("http://localhost:8000/api/product/createmacro", macros)

        return result.data.success
    } catch (err) {
        return err
    }
})
