import { combineReducers } from 'redux';
import auth from './auth/AuthReducer'
import lists from './lists/ListReducer'
import food from './food/FoodReducer'
import address from './address/AddressReducer'
import order from './order/OrderReducer'
const rootReducer = combineReducers({
    auth,
    lists,
    address,
    food,
    order
});

export default rootReducer;