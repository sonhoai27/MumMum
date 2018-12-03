import {ACTION_TYPES} from "./OrderTypes";
import {FAILURE, REQUEST, SUCCESS} from "../../configs/ActionTypeUtil";

const initialState = {
    ordersState: [],
    historyOrdersOfUserState: [],
    detailOrderByIdState: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.API_CREATE_ORDER):
        case FAILURE(ACTION_TYPES.API_CREATE_ORDER): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_CREATE_ORDER): {
            return {
                ...state,
                ordersState: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_GET_ALL_HISTORY_ORDER_OF_USER):
        case FAILURE(ACTION_TYPES.API_GET_ALL_HISTORY_ORDER_OF_USER): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_ALL_HISTORY_ORDER_OF_USER): {
            return {
                ...state,
                historyOrdersOfUserState: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_GET_DETAIL_ORDER_BY_ID):
        case FAILURE(ACTION_TYPES.API_GET_DETAIL_ORDER_BY_ID): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_DETAIL_ORDER_BY_ID): {
            return {
                ...state,
                detailOrderByIdState: action.payload.data
            }
        }

        default: {
            return state
        }
    }
}
