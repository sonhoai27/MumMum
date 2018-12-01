import {ACTION_TYPES} from "./Types";
import {FAILURE, REQUEST, SUCCESS} from "../../configs/ActionTypeUtil";

const initialState = {
    loginState: {}
};

export default (state = initialState, action) => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.API_LOGIN):
        case FAILURE(ACTION_TYPES.API_LOGIN): {
            return {
                ...state
            }
        }

        case SUCCESS(ACTION_TYPES.API_LOGIN): {
            return {
                ...state,
                loginState: action.payload.data
            }
        }

        default: {
            return state
        }
    }
}