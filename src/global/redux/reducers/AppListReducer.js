import actionTypes from '../actions';
const INITIAL_STATE = {
    currentApps: [],
    currentlyViewing: {item: null},
    currentReviews: null
}

const appReducer = (state=INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.SET_APPS:{
            let {currentApps, ...restOfState} = state;
            currentApps = action.payload;
            return {currentApps, ...restOfState};
        }
        case actionTypes.APPEND_APPS:{
            const {currentApps, ...restOfState} = state;
            const newApps = currentApps.concat(action.payload);
            return {currentApps: newApps, ...restOfState};
        }
        case actionTypes.VIEW_APP:{
            let {currentlyViewing, ...restOfState} = state;
            currentlyViewing = {item: action.payload}
            return {currentlyViewing, ...restOfState}
        }
        case actionTypes.SET_REVIEWS:{
            let {currentReviews, ...restOfState} = state;
            currentReviews = action.payload;
            return {currentReviews, ...restOfState};
        }

        default:
            return state;
    }
}

export default appReducer;