import axios from 'axios'
import {ACTION_TYPES} from "./Types";
import {API} from "../../configs/Const";

export const apiGetCategories = (email, password) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_CATEGORIES,
        payload: axios.get(API+'categories/getAll')
    })
}
export const apiGetRestaurantsByNearMe = (lat, long) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_RESTAURENTS_BY_NEAR_ME,
        payload: axios.get(API+'/restaurant/nearMe/', {
            params: {
                lat:long,
                long:long
            }
        })
    })
}