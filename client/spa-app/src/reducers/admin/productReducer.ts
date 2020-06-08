import { deleteAdminItemFromList, getAdminProductsList, getOneById, createProduct } from "actions/admin/product/product"
import { createSlice } from "@reduxjs/toolkit"

export interface ProductState {
    productsList: Record<string, unknown>[]
    oneProduct: Record<string, any>
    success: string
}

const initialState: ProductState = {
    productsList: [],
    oneProduct: {},
    success: "",
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        deleteSuccessMsg(state) {
            state.success = ""
        },
        deleteProduct(state) {
            state.oneProduct = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.success = action.payload
        })

        builder.addCase(getAdminProductsList.fulfilled, (state, action) => {
            state.productsList = action.payload
        })

        builder.addCase(getOneById.fulfilled, (state, action) => {
            state.oneProduct = action.payload
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

export const { deleteSuccessMsg, deleteProduct } = productSlice.actions
export default productSlice.reducer
