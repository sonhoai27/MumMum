import {ACTION_TYPES} from "./ListTypes";
import {FAILURE, REQUEST, SUCCESS} from "../../configs/ActionTypeUtil";

const initialState = {
    categoriesState: {},
    restaurantsNearMeState: [],
    myGeolocationState: {},
    menuOfResState: [],
    menuOfResCategoriesState: [],
    menuOfResPagesState: [],
    searchResByNameState: [],
    currentRestaurant: 0,
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

        case (ACTION_TYPES.GEOLOCATION): {
            return {
                ...state,
                myGeolocationState: action.payload
            }
        }

        case REQUEST(ACTION_TYPES.API_GET_MENU_RES):
        case FAILURE(ACTION_TYPES.API_GET_MENU_RES): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_MENU_RES): {
            return {
                ...state,
                menuOfResState: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_GET_RESTAURANT_BY_CATEGORY):
        case FAILURE(ACTION_TYPES.API_GET_RESTAURANT_BY_CATEGORY): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_RESTAURANT_BY_CATEGORY): {
            return {
                ...state,
                menuOfResCategoriesState: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_GET_RESTAURANT_BY_PAGE):
        case FAILURE(ACTION_TYPES.API_GET_RESTAURANT_BY_PAGE): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_RESTAURANT_BY_PAGE): {
            return {
                ...state,
                menuOfResPagesState: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_SEARCH_RESTAURANT_BY_NAME):
        case FAILURE(ACTION_TYPES.API_SEARCH_RESTAURANT_BY_NAME): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_SEARCH_RESTAURANT_BY_NAME): {
            return {
                ...state,
                searchResByNameState: action.payload.data
            }
        }

        case (ACTION_TYPES.CURRENT_RESTAURANT): {
            return {
                ...state,
                currentRestaurant: action.payload
            }
        }
        default: {
            return state
        }
    }
}
