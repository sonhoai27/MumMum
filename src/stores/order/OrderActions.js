import axios from 'axios'
import {ACTION_TYPES} from "./OrderTypes";
import {API} from "../../configs/Const";
import {_removeData, _retrieveData, _storeData} from "../../configs/LocalStorage";

export const apiCreateOrder = (totalPrice, Street, districtId, wardId, phone, item) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_CREATE_ORDER,
        payload: axios.post(API+'/order/create')
    })
};

export const apiGetAllHistoryOrderOfUser= (token) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_ALL_HISTORY_ORDER_OF_USER,
        payload: axios.get(API+'/order/getAll', {
            headers: {
                Authorization : "Bearer "+token
            }
        })
    })
}

export const apiGetDetailOrderById= (token) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.API_GET_DETAIL_ORDER_BY_ID,
        payload: axios.get(API+'/order/getOrder/+id', {
            headers: {
                Authorization : "Bearer "+token
            }
        })
    })
}

export const addToCart = (cart, item, open = 0, type = 0) => dispatch => {
    let tempCart = makeQty(cart, item, open, type);
    _retrieveData("@ORDERS", (result) => {
        if (!result.message){
            _removeData("@ORDERS", result => {
                console.log('CU')
                _storeData("@ORDERS", tempCart, (result) => {
                    if (result.message === 200){
                        dispatch({
                            type: ACTION_TYPES.SHOPPING_CART,
                            payload: tempCart
                        })
                    }
                });
            })
        }else {
            _storeData("@ORDERS", tempCart, (result) => {
                console.log('THEM MOI')
                if (result.message === 200){
                    dispatch({
                        type: ACTION_TYPES.SHOPPING_CART,
                        payload: tempCart
                    })
                }
            });
        }
    })
};

const makeQty = (list, item, open, type) => {
    let tempInitState = [...[], ...list];
    const tempList = tempInitState.filter(e=> {
        return e.idFood === item.idFood
    });
    if(tempList.length === 0){
        if (open !== 0){
            tempInitState = [...tempInitState, ...item]
        } else {
            tempInitState = [...tempInitState, item]
        }
    }
    else if(tempList.length !== 0) {
        tempInitState.map(e=> {
            if(e.idFood === item.idFood) {
                if(type === 0){
                    e.quantity = e.quantity + 1;
                }else {
                    e.quantity = e.quantity === 1 ? 1 : e.quantity - 1;
                }
            }
        })
    }
    return tempInitState;
};