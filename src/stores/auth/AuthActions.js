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
export const setStatusLogin = (status) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.IS_LOGIN,
        payload: status
    })
}