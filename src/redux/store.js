import { languageReducer } from "./reducers/lang-reds";
import { userReducer } from "./reducers/user-reds";

import { combineReducers, createStore } from "redux"

const rootReducer = combineReducers({
    languageHandler: languageReducer,
    userHandler: userReducer,
})

const initialState = {}

const store = createStore(
    rootReducer,
    initialState
)

export default store