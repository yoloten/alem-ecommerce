import { createOrUpdateAddress, AddressInterface, getUserAddresses } from "actions/user/address"
import { register, login, Decoded, setAuthToken } from "actions/user/auth"
import { getOrderDetails, createOrder } from "actions/user/order"
import { createOrUpdateCart } from "actions/user/cart"
import { createSlice } from "@reduxjs/toolkit"

export interface UserState {
    user: Decoded | Record<string, any>
    addresses: AddressInterface[]
    isLoggedIn: boolean
    orderDetails: any
    msg: string
}

const initialState: UserState = {
    isLoggedIn: false,
    orderDetails: {},
    addresses: [],
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
        builder.addCase(createOrUpdateCart.fulfilled, (state, { payload }) => {
            console.log(payload)
        })
        builder.addCase(createOrUpdateAddress.fulfilled, (state, { payload }) => {
            state.msg = "Success"
        })
        builder.addCase(getUserAddresses.fulfilled, (state, { payload }) => {
            state.addresses = payload
        })
        builder.addCase(getOrderDetails.fulfilled, (state, { payload }) => {
            state.orderDetails = payload
        })
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.msg = "Success"
        })
    },
})

export const { deleteMsg, setMsg, logout, setUserFromLocalStorage } = userSlice.actions
export default userSlice.reducer
