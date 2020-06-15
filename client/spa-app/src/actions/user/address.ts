import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode from "jwt-decode"
import axios from "axios"

export interface Address {
    address: string
    city: string
    postalcode: string
    phone: string
}

export const createOrUpdateAddress = createAsyncThunk("user/createOrUpdateAddress", async (address: Address) => {
    try {
        const token = localStorage.getItem("jwtToken")

        const result = await axios.post("http://localhost:8000/api/user/createaddress", address, {
            headers: { Authorization: token },
        })

        return result.data.success
    } catch (err) {
        return err.response.data.success
    }
})
