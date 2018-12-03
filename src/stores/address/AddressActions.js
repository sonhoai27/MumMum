import axios from 'axios'
import {ACTION_TYPES} from "./AddressTypes";
import {API} from "../../configs/Const";

export const apiGetAllDistricts = (districtId) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_ALL_DISTRICT,
        payload: axios.get(API+'/district/getAll'+districtId)
    })
};

export const apiGetWardsByDistrict = (wardId) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_WARD_BY_DISTRICT,
        payload: axios.get(API+'/ward/getAllByDistrict'+wardId)
    })
};