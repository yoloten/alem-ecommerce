import { createSlice } from "@reduxjs/toolkit"
import {
    deleteAdminItemFromList,
    getLastLevelCategories,
    getAdminProductsList,
    createOrEditCategory,
    getAllCategories,
    deleteCategory,
    createMacros,
    getAllMacros,
    Category,
    Options,
    Macro,
} from "actions/admin/product"

export interface Product {
    lastLevelCategories: Record<string, unknown>[]
    productsList: Record<string, unknown>[]
    categories: Category[]
    success: string
    macros: Macro[]
}

const initialState: Product = {
    lastLevelCategories: [],
    productsList: [],
    categories: [],
    success: "",
    macros: [],
}

export const productSlice = createSlice({
    name: "product",
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

        addNewMacro(state, { payload }) {
            state.macros.push(payload)
        },

        validatorsChange(state, { payload }) {
            const { name, value, type, checked, id } = payload

            if (type === "checkbox") {
                state.macros[parseInt(id, 10)].validators[name] = checked
            } else {
                state.macros[parseInt(id, 10)].validators[name] = value
            }
        },

        macrosChange(state, { payload }) {
            const { name, value, id }: { name: string; value: string; id: number } = payload

            if (name === "type") {
                state.macros[id].type = value
                state.macros[id].validators = {}

                if (value === "number") {
                    state.macros[id].validatorsList = ["min", "max", "required"]
                }
                if (value === "string") {
                    state.macros[id].validatorsList = [
                        "minLength",
                        "maxLength",
                        "pattern",
                        "pattern-description",
                        "mask",
                        "required",
                    ]
                }

                if (value === "enum") {
                    state.macros[id].validatorsList = ["required"]
                }
            }

            if (name === "name") {
                state.macros[id].name = value
            }
            if (name === "label") {
                state.macros[id].label = value
            }
        },

        optionsChange(state, { payload }) {
            const {
                id,
                className,
                value,
                name,
            }: { name: string; value: string; id: number; className: number } = payload

            if (name === "name") {
                state.macros[className].options[id].name = value
            }
            if (name === "label") {
                state.macros[className].options[id].label = value
            }
            if (name === "value") {
                state.macros[className].options[id].value = value
            }
        },

        addNewOption(state, { payload }) {
            const { id, option }: { id: number; option: Options } = payload

            state.macros[payload.id].options.push(option)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminProductsList.fulfilled, (state, action) => {
            state.productsList = action.payload
        })

        builder.addCase(deleteAdminItemFromList.fulfilled, (state, action) => {
            state.productsList.map((item: any, index: number) => {
                if (item.id === action.payload) {
                    state.productsList.splice(index, 1)
                }
            })
        })

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

        builder.addCase(getAllMacros.fulfilled, (state, action) => {
            state.macros = action.payload
        })

        builder.addCase(createMacros.fulfilled, (state, action) => {
            state.success = "Success"
        })
    },
})

export const {
    addCategory,
    changeCategory,
    deleteSuccessMsg,
    addNewMacro,
    addNewOption,
    validatorsChange,
    macrosChange,
    optionsChange,
} = productSlice.actions
export default productSlice.reducer
