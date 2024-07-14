import { legacy_createStore as createStore, combineReducers } from "redux"
import stockReducer from "./reducer"

const rootReducer = combineReducers({
    stock: stockReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store

// export const wrapper = createWrapper(makeStore)
