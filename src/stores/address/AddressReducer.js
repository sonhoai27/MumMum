import {ACTION_TYPES} from "./AddressTypes";
import {FAILURE, REQUEST, SUCCESS} from "../../configs/ActionTypeUtil";

const initialState = {
    districts: [],
    wardsByDistrict: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.API_GET_ALL_DISTRICT):
        case FAILURE(ACTION_TYPES.API_GET_ALL_DISTRICT): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_ALL_DISTRICT): {
            return {
                ...state,
                districts: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_GET_WARD_BY_DISTRICT):
        case FAILURE(ACTION_TYPES.API_GET_WARD_BY_DISTRICT): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_WARD_BY_DISTRICT): {
            return {
                ...state,
                wardsByDistrict: action.payload.data
            }
        }
        default: {
            return state
        }
    }
}
