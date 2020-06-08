import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export interface Options {
    meta?: Record<string, string | number>
    label: string
    value: string
    uuid: string
    name: string
    id?: number
}

export interface Macro {
    validators: Record<string, string | number>
    validatorsList: string[]
    options: Options[]
    label: string
    name: string
    type: string
    uuid: string
    id?: number
}

export interface Attribute {
    allowFilter: boolean
    label: string
    name: string
    type: string
}

// MACROS
export const getAllMacros = createAsyncThunk("product/getAllMacros", async () => {
    try {
        const result = await axios.get("http://localhost:8000/api/product/allmacros")
        const macros: Macro[] = result.data

        return macros
    } catch (err) {
        return err
    }
})

export const createMacros = createAsyncThunk("product/createMacros", async (macros: Macro[]) => {
    try {
        const result = await axios.post("http://localhost:8000/api/product/createmacro", macros)

        return result.data.success
    } catch (err) {
        return err
    }
})

// ATTRIBUTES
export const getAllAttributes = createAsyncThunk("product/getAllAttributes", async () => {
    try {
        const result = await axios.get("http://localhost:8000/api/product/schema", {
            params: { table: "product" },
        })
        if (result.data && result.data.msg !== "no schema") {
            const attributes: Attribute[] = JSON.parse(result.data.attributes)

            return attributes
        } else {
            return []
        }
    } catch (err) {
        return err
    }
})

export const createAttribute = createAsyncThunk(
    "product/createAttribute",
    async ({ table, attributes }: { table: string; attributes: Attribute[] }) => {
        try {
            const result = await axios.post("http://localhost:8000/api/product/createschema", { table, attributes })

            return result.data.success
        } catch (err) {
            return err
        }
    },
)
