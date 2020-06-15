import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode from "jwt-decode"
import axios from "axios"

export interface Decoded {
    primaryKey: string
    email: string
    phone: string
    photo: string
    name: string
    role: string
    id: string
    exp?: any
}

export const createOrUpdateCart = createAsyncThunk("user/createOrUpdateCart", async (storageData: any[]) => {
    try {
        const token = localStorage.getItem("jwtToken")

        const result = await axios.post(
            "http://localhost:8000/api/order/createcart",
            {
                cartItems: storageData.filter((i) => i !== undefined),
                id: localStorage.getItem("id"),
            },
            {
                headers: { Authorization: token },
            },
        )

        return result.data.success
    } catch (err) {
        return err.response.data.success
    }
})
