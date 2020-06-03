import { combineReducers } from "redux"
import { productReducer } from "../reducers/product"

export const rootReducer = combineReducers({
    product: productReducer,
})

export interface RootState {
    product: {
        allProducts: [],
    }
}
