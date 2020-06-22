import { createSlice } from "@reduxjs/toolkit"
import {
    deleteAdminItemFromList,
    getAdminProductsList,
    getOneById,
    createProduct,
    updateProduct,
} from "actions/admin/product/product"

export interface ProductState {
    productListChunksLength: number
    productsList: Record<string, unknown>[]
    oneProduct: any
    success: string
}

const initialState: ProductState = {
    productListChunksLength: 0,
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
        clearList(state) {
            state.productsList = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.success = action.payload
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.success = action.payload
        })

        builder.addCase(getAdminProductsList.fulfilled, (state, action) => {
            state.productsList = [...state.productsList, ...action.payload]
            state.productListChunksLength = action.payload.length
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

export const { deleteSuccessMsg, deleteProduct, clearList } = productSlice.actions
export default productSlice.reducer
