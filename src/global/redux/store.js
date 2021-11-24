import {createStore, combineReducers} from 'redux';
import {AppListReducer as appList} from "./reducers/AppListReducer";
import {AccountReducers as account} from "./reducers/AccountReducers";
const store = createStore(combineReducers({
    appList,
    account
}));

export default store;