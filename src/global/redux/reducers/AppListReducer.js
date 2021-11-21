import actionTypes from '../actions';
const INITIAL_STATE = {
    currentApps: []
}

const appReducer = (state=INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.SET_APPS:{
            const {currentApps} = state;
            [].splice.apply(currentApps, [0, currentApps.length].concat(action.payload));
            return {currentApps};
        }

        case actionTypes.APPEND_APPS:{
            const {currentApps} = state;
            const newApps = currentApps.concat(action.payload);
            return {currentApps: newApps};
        }

        default:
            return state;
    }
}

export default appReducer;