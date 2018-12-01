import axios from 'axios'
import {ACTION_TYPES} from "./Types";
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