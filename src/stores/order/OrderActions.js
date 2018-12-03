import axios from 'axios'
import {ACTION_TYPES} from "./OrderTypes";
import {API} from "../../configs/Const";

export const apiCreateOrder = (totalPrice, Street, ) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_CREATE_ORDER,
        payload: axios.post(API+'/order/create')
    })
};

export const apiSearchFoodsByName = (Id) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_SEARCH_FOOD_BY_NAME,
        payload: axios.get(API+'/food/searchfood'+Id)
    })
};