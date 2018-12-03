import axios from 'axios'
import {ACTION_TYPES} from "./ListTypes";
import {API} from "../../configs/Const";

export const apiGetCategories = (email, password) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_CATEGORIES,
        payload: axios.get(API + 'categories/getAll')
    })
};


export const apiGetRestaurantsByNearMe = (lat, long) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_RESTAURENTS_BY_NEAR_ME,
        payload: axios.get(API + 'restaurant/nearMe/' + lat + '&' + long)
    })
};

export const setMyGeoLocation = (geolocation) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.GEOLOCATION,
        payload: geolocation
    })
}

export const getMenusRes = (resId) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.API_GET_MENU_RES,
        payload: axios.get(API + 'restaurant/getMenu/' + resId)
    })
}

export const getResByCategories = (catId) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.API_GET_RESTAURANT_BY_CATEGORY,
        payload: axios.get(API + '/restaurant/getCategory/' + catId)
    })
}

export const getResByPage = (per_pageId, pageId) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.API_GET_RESTAURANT_BY_PAGE,
        payload: axios.get(API + '/restaurant/getAll/', {params: {per_page: per_pageId, page: pageId}})
    })
}

export const searchResByName = (nameId) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.API_SEARCH_RESTAURANT_BY_NAME,
        payload: axios.get(API + '/restaurant/search/' + nameId)
    })
}
