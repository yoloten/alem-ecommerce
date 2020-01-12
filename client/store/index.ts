import { composeWithDevTools } from "redux-devtools-extension"
import { createStore, applyMiddleware } from "redux"
import { rootReducer } from "../reducers"
import { RootState } from "../reducers"
import thunk from "redux-thunk"

export const initializeStore = (preloadedState: RootState) => {
    return createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(thunk)),
    )
  }
