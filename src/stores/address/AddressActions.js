import axios from 'axios'
import {ACTION_TYPES} from "./AddressTypes";
import {API} from "../../configs/Const";
import {_storeData} from "../../configs/LocalStorage";

export const apiGetAllDistricts = () => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_ALL_DISTRICT,
        payload: axios.get(API+'district/getAll')
    })
};

export const apiGetWardsByDistrict = (wardId) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_WARD_BY_DISTRICT,
        payload: axios.get(API+'ward/getAllByDistrict/', {
            params: {
                id: wardId
            }
        })
    })
};

export const setMyAddress = (address) => dispatch => {
    _storeData("@ADDRESS", address, (result) => {
        if (result.message === 200){
            dispatch({
                type: ACTION_TYPES.SET_MY_ADDRESS,
                payload: address
            })
        }
    });

};