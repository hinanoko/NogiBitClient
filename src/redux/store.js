import { languageReducer } from "./reducers/lang-reds";

import { combineReducers, createStore } from "redux"

const rootReducer = combineReducers({
    languageHandler: languageReducer
})

const initialState = {}

const store = createStore(
    rootReducer,
    initialState
)

export default store