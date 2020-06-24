import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode from "jwt-decode"
import cookie from "js-cookie"
import axios from "axios"

export interface CreditCard {
    number: string
    exp: string
    cvc: string
}

export interface OrderData {
    orderDetails: any
    card: CreditCard
}

export const getOrderDetails = createAsyncThunk("user/getOrderDetails", async () => {
    try {
        const token = cookie.get("token")

        const result = await axios.get("http://localhost:8000/api/order/getorderdetails", {
            headers: { Authorization: token },
        })

        return result.data
    } catch (err) {
        return err.response.data.success
    }
})

export const createOrder = createAsyncThunk("user/createOrder", async (orderData: OrderData) => {
    try {
        const token = cookie.get("token")

        const result = await axios.post("http://localhost:8000/api/order/create", orderData, {
            headers: { Authorization: token },
        })

        return result.data.success
    } catch (err) {
        return err.response.data.success
    }
})
