import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// PRODUCT
export const createProduct = createAsyncThunk<any, any, any>(
    "product/createProduct",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const created = await axios.post("http://localhost:8000/api/product/create", { table: "product" })

            if (created.data.success) {
                await axios.post("http://localhost:8000/api/product/insert", formData)

                return "Success"
            }

            return "Something went wrong"
        } catch (err) {
            return err.response.data.msg
        }
    },
)

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

export const getOneById = createAsyncThunk<any, any, any>(
    "product/getOneById",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8000/api/product/onebyid", {
                params: { id, edit: true },
            })

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
