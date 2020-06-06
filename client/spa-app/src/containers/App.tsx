import { navigation } from "containers/Navigation"
import { View, Router } from "react-navi"
import React, { Suspense } from "react"

export default function App(): JSX.Element {
    // const state = useSelector((state: RootState) => state.login.isAuthenticated)
    return (
        <Router navigation={navigation}>
            <div>
                <Suspense fallback={null}>
                    <View />
                </Suspense>
            </div>
        </Router>
    )
}
