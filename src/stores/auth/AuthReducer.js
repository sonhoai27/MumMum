import {ACTION_TYPES} from "./AuthTypes";
import {FAILURE, REQUEST, SUCCESS} from "../../configs/ActionTypeUtil";

const initialState = {
    userState: {},
    isLoginState: false,
    loginState: {},
    userInfoState: {},
    forgetPasswordState: {},
    registerState: {},
    updateInfoState: {},
    updatePasswordState: {},
    verifyState: {}
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

        // get user info
        case REQUEST(ACTION_TYPES.API_GET_INFO_USER):
        case FAILURE(ACTION_TYPES.API_GET_INFO_USER): {
            return {
                ...state
            }
        }

        case SUCCESS(ACTION_TYPES.API_GET_INFO_USER): {
            return {
                ...state,
                userInfoState: action.payload.data
            }
        }

        // update user info
        case REQUEST(ACTION_TYPES.API_UPDATE_INFO):
        case FAILURE(ACTION_TYPES.API_UPDATE_INFO): {
            return {
                ...state
            }
        }

        case SUCCESS(ACTION_TYPES.API_UPDATE_INFO): {
            return {
                ...state,
                updateInfoState: action.payload.data
            }
        }

        // forget pass
        case REQUEST(ACTION_TYPES.API_FORGET_PASSWORD):
        case FAILURE(ACTION_TYPES.API_FORGET_PASSWORD): {
            return {
                ...state
            }
        }

        case SUCCESS(ACTION_TYPES.API_FORGET_PASSWORD): {
            return {
                ...state,
                forgetPasswordState: action.payload.data
            }
        }

        // update pass
        case REQUEST(ACTION_TYPES.API_UPDATE_PASSWORD):
        case FAILURE(ACTION_TYPES.API_UPDATE_PASSWORD): {
            return {
                ...state
            }
        }

        case SUCCESS(ACTION_TYPES.API_UPDATE_PASSWORD): {
            return {
                ...state,
                updatePasswordState: action.payload.data
            }
        }

        // register
        case REQUEST(ACTION_TYPES.API_REGISTER):
        case FAILURE(ACTION_TYPES.API_REGISTER): {
            return {
                ...state
            }
        }

        case SUCCESS(ACTION_TYPES.API_REGISTER): {
            return {
                ...state,
                registerState: action.payload.data
            }
        }

        // verify
        case REQUEST(ACTION_TYPES.API_RESEND_TOKEN):
        case FAILURE(ACTION_TYPES.API_RESEND_TOKEN): {
            return {
                ...state
            }
        }

        case SUCCESS(ACTION_TYPES.API_RESEND_TOKEN): {
            return {
                ...state,
                verifyState: action.payload.data
            }
        }

        case (ACTION_TYPES.USER): {
            return {
                ...state,
                userState: action.payload
            }
        }
        case (ACTION_TYPES.IS_LOGIN): {
            return {
                ...state,
                isLoginState: action.payload
            }
        }

        default: {
            return state
        }
    }
}