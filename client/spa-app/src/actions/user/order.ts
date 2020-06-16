import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode from "jwt-decode"
import axios from "axios"

// export interface Decoded {
//     primaryKey: string
//     email: string
//     phone: string
//     photo: string
//     name: string
//     role: string
//     id: string
//     exp?: any
// }

export const getOrderDetails = createAsyncThunk("user/getOrderDetails", async () => {
    try {
        const token = localStorage.getItem("jwtToken")

        const result = await axios.get("http://localhost:8000/api/order/getorderdetails", {
            headers: { Authorization: token },
        })

        return result.data
    } catch (err) {
        return err.response.data.success
    }
})
