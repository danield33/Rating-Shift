import {combineReducers, createStore} from 'redux';
import appList from "./reducers/AppListReducer";
import account from "./reducers/AccountReducers";

const store = createStore(combineReducers({
    appList,
    account
}));

export default store;