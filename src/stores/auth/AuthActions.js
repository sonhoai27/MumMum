import axios from 'axios'
import {ACTION_TYPES} from "./AuthTypes";
import {API} from "../../configs/Const";

export const apiLogin = (email, password) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_LOGIN,
        payload: axios.post(API+'login', {
            email: email,
            password: password
        })
    })
}
export const apiRegister = (email, password) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_REGISTER,
        payload: axios.post(API+'register', {
            email: email,
            password: password
        })
    })
}
export const setStatusLogin = (status) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.IS_LOGIN,
        payload: status
    })
}
export const setUserToken = (user) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.USER,
        payload: user
    })
}
export const apiReSendToke = (email) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_RESEND_TOKEN,
        payload: axios.post(API+'verify', {
            email: email
        })
    })
}
export const apiForgetPassword = (email) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_FORGET_PASSWORD,
        payload: axios.post(API+'forgetPassword', {
            email: email
        })
    })
}
export const apiUserInfo= (token) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_INFO_USER,
        payload: axios.get(API+'getinfo', {
            headers: {
                Authorization : "Bearer "+token
            }
        })
    })
}