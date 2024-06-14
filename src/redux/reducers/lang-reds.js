import { LANGUAGE_CN, LANGUAGE_EN, LANGUAGE_JP } from "../constants/lang-consts";

const initialState = {
    language: 'en',
}

export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LANGUAGE_CN:
            return {
                ...state,
                language: "cn"
            }
        case LANGUAGE_EN:
            return {
                ...state,
                language: "en"
            }
        case LANGUAGE_JP:
            return {
                ...state,
                language: "jp"
            }
        default:
            return state;
    }
}