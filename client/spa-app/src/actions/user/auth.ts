import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode from "jwt-decode"
import cookie from "js-cookie"
import axios from "axios"

export interface User {
    password: string
    email: string
    name?: string
}

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

export const register = createAsyncThunk("user/register", async (user: FormData) => {
    try {
        const result = await axios.post("http://localhost:8000/api/user/register", user)

        return result.data.success
    } catch (err) {
        return err.response.data.success
    }
})

export const login = createAsyncThunk("user/login", async (user: User) => {
    try {
        const result = await axios.post("http://localhost:8000/api/user/login", user)
        const { token } = result.data
        const decoded: Decoded = jwt_decode(token)

        cookie.set("token", token)
        setAuthToken(token)

        return decoded
    } catch (err) {
        return err.response.data.msg
    }
})

export const setAuthToken = (token: string): void => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}
