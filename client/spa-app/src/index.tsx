import "core-js/stable"
import "regenerator-runtime/runtime"

import { Provider } from "react-redux"
import * as ReactDOM from "react-dom"
import React from "react"

import App from "./containers/App"
import store from "store"

import "./styles/_main.sass"

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root"),
    )
}

render()

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./containers/App", render)
}
