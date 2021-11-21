import {createStore} from 'redux';
import AppListReducer from "./reducers/AppListReducer";

const store = createStore(AppListReducer);

export default store;