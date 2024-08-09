// reducers/userReducer.js
import { SET_USER, CLEAR_USER, CHANGE_COINS } from '../constants/user-consts'

const initialState = {
    userName: "",
    userPassword: "",
    userToken: "",
    coins: 0,
    userId: 0,
    isLoggedIn: false,  // 新增状态
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                userName: action.payload.userName,
                userPassword: action.payload.userPassword,
                userToken: action.payload.userToken,
                userId: action.payload.userId,
                coins: action.payload.userCoin,
                isLoggedIn: true,  // 设置登录状态
            };
        case CLEAR_USER:
            return initialState;
        case CHANGE_COINS:
            return {
                ...state,
                coins: action.payload
            }
        default:
            return state;
    }
};

