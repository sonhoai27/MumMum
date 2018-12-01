import { combineReducers } from 'redux';
import auth from './auth/AuthReducer'
import lists from './lists/Reducer'
const rootReducer = combineReducers({
    auth,
    lists
});

export default rootReducer;