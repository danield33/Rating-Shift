import {combineReducers} from "redux";

const INITIAL_STATE = {
    currentApps: []
}

const appReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_APPS':{
            let {currentApps} = state;
            currentApps = action.payload
            const newState = {currentApps};
            return newState;
        }
        case 'APPEND_APPS':{
            const {currentApps} = state;
            const concattedApps = currentApps.concat(action.payload);
            return {currentApps: concattedApps};
        }
        default:
            return state;
    }
}

export default combineReducers({
    appList: appReducer
})