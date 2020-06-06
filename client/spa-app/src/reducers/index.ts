import { combineReducers } from "@reduxjs/toolkit"
import productReducer from "./admin/productReducer"

const rootReducer = combineReducers({
    product: productReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
