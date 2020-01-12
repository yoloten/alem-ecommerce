import { Action as ReduxAction, handleActions } from "redux-actions"
import { Action, Payload } from "../actions/product"

export interface InitialState {
    allProducts: any
}

const State: InitialState = {
    allProducts: [],
}

export const productReducer = handleActions<InitialState, any>({
    [Action.GET_ALLPRODUCTS]: (state, { payload }: ReduxAction<Payload.GetAllProducts>) => {
        return {
            ...state,
            allProducts: payload,
        }
    },
}, State)
