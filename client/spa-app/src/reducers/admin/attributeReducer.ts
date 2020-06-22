import { createSlice } from "@reduxjs/toolkit"
import {
    getAllAttributes,
    createAttribute,
    Attribute,
    Macro,
    Options,
    getAllMacros,
    createMacros,
} from "actions/admin/product/attributes"

export interface AttributeAndMacro {
    attributes: Attribute[]
    success: string
    macros: Macro[]
}

const initialState: AttributeAndMacro = {
    attributes: [],
    success: "",
    macros: [],
}

export const attributeSlice = createSlice({
    name: "attribute",
    initialState,
    reducers: {
        deleteSuccessMsg(state) {
            state.success = ""
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
            const { name, value, id, checked }: { name: string; value: string; id: number; checked: boolean } = payload

            if (name === "type") {
                state.macros[id].type = value
                state.macros[id].validators = {}

                if (value === "number") {
                    state.macros[id].validatorsList = ["min", "max", "required"]
                }
                if (value === "string") {
                    state.macros[id].validatorsList = ["minLength", "maxLength", "required"]
                }

                if (value === "enum") {
                    state.macros[id].validatorsList = ["required"]
                }
            }

            if (name === "name") {
                state.macros[id].name = value.toLowerCase().split(" ").join("_").trim()
            }
            if (name === "label") {
                state.macros[id].label = value
            }
            if (name === "selectable") {
                state.macros[id].selectable = checked
            }
        },

        optionsChange(state, { payload }) {
            const { id, value, name, macroID }: { name: string; value: string; id: number; macroID: number } = payload

            if (name === "name") {
                state.macros[macroID].options[id].name = value.toLowerCase().split(" ").join("_").trim()
            }
            if (name === "label") {
                state.macros[macroID].options[id].label = value
            }
            if (name === "value") {
                state.macros[macroID].options[id].value = value
            }
        },

        addNewOption(state, { payload }) {
            const { id, option }: { id: number; option: Options } = payload

            state.macros[payload.id].options.push(option)
        },

        changeAttributes(state, { payload }) {
            const { name, id, value, checked }: { name: string; value: string; id: number; checked: boolean } = payload

            if (name === "label") {
                state.attributes[id].label = value
            }
            if (name === "name") {
                state.attributes[id].name = value.toLowerCase().split(" ").join("_").trim()
            }
            if (name === "type") {
                console.log(value)
                state.attributes[id].type = value
            }
            if (name === "allowFilter") {
                state.attributes[id].allowFilter = checked
            }
        },

        addNewAttribute(state, { payload }) {
            const attribute: Attribute = payload

            state.attributes.push(attribute)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMacros.fulfilled, (state, action) => {
            state.macros = action.payload
        })

        builder.addCase(createMacros.fulfilled, (state, action) => {
            state.success = "Success"
        })

        builder.addCase(getAllAttributes.fulfilled, (state, action) => {
            state.attributes = action.payload
        })

        builder.addCase(createAttribute.fulfilled, (state, action) => {
            state.success = "Success"
        })
    },
})

export const {
    deleteSuccessMsg,
    addNewMacro,
    addNewOption,
    validatorsChange,
    macrosChange,
    optionsChange,
    changeAttributes,
    addNewAttribute,
} = attributeSlice.actions

export default attributeSlice.reducer
