import { combineReducers } from 'redux';
import auth from './auth/Reducer'
import lists from './lists/Reducer'
const rootReducer = combineReducers({
    auth,
    lists
});

export default rootReducer;