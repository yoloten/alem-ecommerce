import { combineReducers } from "@reduxjs/toolkit"

import attributeReducer from "./admin/attributeReducer"
import categoryReducer from "./admin/categoryReducer"
import productReducer from "./admin/productReducer"

const rootReducer = combineReducers({
    product: productReducer,
    attribute: attributeReducer,
    category: categoryReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
