import { LANGUAGE_CN, LANGUAGE_EN, LANGUAGE_JP } from "../constants/lang-consts";

export const changeToEn = () => ({
    type: LANGUAGE_EN,
});

export const changeToCn = () => ({
    type: LANGUAGE_CN,
})

export const changeToJp = () => ({
    type: LANGUAGE_JP,
})