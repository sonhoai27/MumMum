import {ACTION_TYPES} from "./Types";
import {FAILURE, REQUEST, SUCCESS} from "../../configs/ActionTypeUtil";

const initialState = {
    categoriesState: {},
    restaurantsNearMeState: []
};

export default (state = initialState, action) => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.API_GET_CATEGORIES):
        case FAILURE(ACTION_TYPES.API_GET_CATEGORIES): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_CATEGORIES): {
            return {
                ...state,
                categoriesState: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_GET_RESTAURENTS_BY_NEAR_ME):
        case FAILURE(ACTION_TYPES.API_GET_RESTAURENTS_BY_NEAR_ME): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_RESTAURENTS_BY_NEAR_ME): {
            return {
                ...state,
                restaurantsNearMeState: action.payload.data
            }
        }

        default: {
            return state
        }
    }
}