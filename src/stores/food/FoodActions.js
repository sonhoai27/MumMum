import axios from 'axios'
import {ACTION_TYPES} from "./FoodTypes";
import {API} from "../../configs/Const";

export const apiSearchFoodsByCategory = (catId) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_SEARCH_FOOD_BY_NAME_OF_CATEGORY,
        payload: axios.get(API+'/food/searchtype/'+catId)
    })
};

export const apiSearchFoodsByName = (foodId) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_SEARCH_FOOD_BY_NAME,
        payload: axios.get(API+'/food/searchfood/'+foodId)
    })
};