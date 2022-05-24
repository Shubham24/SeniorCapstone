import {combineReducers} from 'redux';
import userReducer from './userReducer';

// Contains all Reducers for Redux
const allReducers = combineReducers({
    userReducer
});

export default allReducers;