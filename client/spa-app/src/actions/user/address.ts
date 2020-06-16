import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode from "jwt-decode"
import axios from "axios"

export interface AddressInterface {
    postalcode: string
    selected?: boolean
    id: null | number
    address: string
    phone: string
    city: string
}

export const createOrUpdateAddress = createAsyncThunk(
    "user/createOrUpdateAddress",
    async (address: AddressInterface) => {
        try {
            const token = localStorage.getItem("jwtToken")

            const result = await axios.post("http://localhost:8000/api/user/createaddress", address, {
                headers: { Authorization: token },
            })

            return result.data.success
        } catch (err) {
            return err.response.data.success
        }
    },
)

export const getUserAddresses = createAsyncThunk("user/getUserAddresses", async () => {
    try {
        const token = localStorage.getItem("jwtToken")

        const result = await axios.get("http://localhost:8000/api/user/getuseraddresses", {
            headers: { Authorization: token },
        })

        return result.data
    } catch (err) {
        return err
    }
})
