// actions/userActions.js
import { SET_USER, CLEAR_USER, CHANGE_COINS } from "../constants/user-consts";

export const setUser = (userData) => ({
    type: SET_USER,
    payload: userData,
});

export const clearUser = () => ({
    type: CLEAR_USER,
});

export const changeCoins = (newCoins) => ({
    type: CHANGE_COINS,
    payload: newCoins,
})