import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

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
