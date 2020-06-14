import { createSlice } from "@reduxjs/toolkit"
import {
    getLastLevelCategories,
    createOrEditCategory,
    getAllCategories,
    deleteCategory,
    Category,
} from "actions/admin/product/category"

export interface CategoryState {
    lastLevelCategories: Record<string, unknown>[]
    categories: Category[]
    success: string
}

const initialState: CategoryState = {
    lastLevelCategories: [],
    categories: [],
    success: "",
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        deleteSuccessMsg(state) {
            state.success = ""
        },

        addCategory(state, { payload }) {
            const { id, child }: { id: string; child: Category } = payload

            state.categories.map((item: Category, i: number) => {
                if (item.uuid === id) {
                    if (item.parents.length > 0) {
                        child.parents = child.parents.concat(item.parents)
                        child.parents.push(item.uuid)
                    } else {
                        child.parents.push(item.uuid)
                    }

                    state.categories.splice(i + 1, 0, child)
                    child.created_index = state.categories[i].created_index + 1
                    item.children.push(child.uuid)
                }
            })
        },

        changeCategory(state, { payload }) {
            const { id, value }: { id: number; value: string } = payload
            console.log(id)
            state.categories[id].name = value
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLastLevelCategories.fulfilled, (state, action) => {
            state.lastLevelCategories = action.payload
        })

        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            const { id, node } = action.payload

            state.categories.map((item, index: number) => {
                if (item.uuid === node.parent) {
                    item.children.map((child: string, index: number) => {
                        if (child === node.uuid) {
                            item.children.splice(index, 1)
                        }
                    })
                }
            })

            state.categories.splice(id, 1)
        })

        builder.addCase(createOrEditCategory.fulfilled, (state, action) => {
            state.success = "Success"
        })
    },
})

export const { deleteSuccessMsg, changeCategory, addCategory } = categorySlice.actions
export default categorySlice.reducer
