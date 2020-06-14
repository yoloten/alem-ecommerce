import { register, login, Decoded, setAuthToken } from "actions/user/auth"
import { createSlice } from "@reduxjs/toolkit"

export interface UserState {
    isLoggedIn: boolean
    user: Decoded | Record<string, unknown>
    msg: string
}

const initialState: UserState = {
    isLoggedIn: false,
    user: {},
    msg: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        deleteMsg(state) {
            state.msg = ""
        },
        setMsg(state, { payload }) {
            state.msg = payload
        },
        logout(state) {
            localStorage.removeItem("jwtToken")
            setAuthToken("")
            state.isLoggedIn = false
            state.user = {}
        },
        setUserFromLocalStorage(state, { payload }) {
            state.user = payload
            state.isLoggedIn = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.msg = payload
        })
        builder.addCase(login.fulfilled, (state, { payload }) => {
            if (typeof payload !== "string") {
                state.user = payload
                state.isLoggedIn = true
            } else {
                state.msg = payload
            }
        })
    },
})

export const { deleteMsg, setMsg, logout, setUserFromLocalStorage } = userSlice.actions
export default userSlice.reducer
