import {createStore, combineReducers} from 'redux';
import AppListReducer from "./reducers/AppListReducer";
import AccountReducers from "./reducers/AccountReducers";
const store = createStore(combineReducers({
    AppListReducer,
    AccountReducers
}));

export default store;