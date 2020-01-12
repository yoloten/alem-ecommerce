import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { createAction } from "redux-actions"
import { AnyAction } from "redux"
import axios from "axios"

export enum Action {
    GET_ALLPRODUCTS = "GET_ALLPRODUCTS",
}

export namespace Payload {
    export interface GetAllProducts {
        products: any
    }
}

export const getAllProductsAction = createAction<Payload.GetAllProducts>(Action.GET_ALLPRODUCTS)

export const getAllProducts = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        try {
            const res = await axios.get("http://localhost:8000/api/product/all")
            
            dispatch(getAllProductsAction(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}
