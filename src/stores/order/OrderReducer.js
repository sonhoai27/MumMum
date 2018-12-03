import {ACTION_TYPES} from "./OrderTypes";
import {FAILURE, REQUEST, SUCCESS} from "../../configs/ActionTypeUtil";

const initialState = {
    foodsByNameOfCategoryState: [],
    foodsByNameState: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.API_SEARCH_FOOD_BY_NAME_OF_CATEGORY):
        case FAILURE(ACTION_TYPES.API_SEARCH_FOOD_BY_NAME_OF_CATEGORY): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_SEARCH_FOOD_BY_NAME_OF_CATEGORY): {
            return {
                ...state,
                foodsByNameOfCategoryState: action.payload.data
            }
        }

        case REQUEST(ACTION_TYPES.API_SEARCH_FOOD_BY_NAME):
        case FAILURE(ACTION_TYPES.API_SEARCH_FOOD_BY_NAME): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_SEARCH_FOOD_BY_NAME): {
            return {
                ...state,
                foodsByNameState: action.payload.data
            }
        }
        default: {
            return state
        }
    }
}
