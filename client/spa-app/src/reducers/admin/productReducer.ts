import { createSlice } from "@reduxjs/toolkit"
import { getAdminProductsList, deleteAdminItemFromList } from "actions/admin/product"

export interface Product {
    productsList: Record<string, unknown>[]
    error: any
}

const initialState: Product = {
    productsList: [],
    error: null,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAdminProductsList.fulfilled, (state, action) => {
            state.productsList = action.payload
        })
        builder.addCase(getAdminProductsList.rejected, (state, action) => {
            state.error = action.error
        })
        builder.addCase(deleteAdminItemFromList.fulfilled, (state, action) => {
            state.productsList.map((item: any, index: number) => {
                if (item.id === action.payload) {
                    state.productsList.splice(index, 1)
                }
            })
        })
    },
})

export default productSlice.reducer
