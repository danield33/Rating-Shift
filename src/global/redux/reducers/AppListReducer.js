import actionTypes from '../actions';
const INITIAL_STATE = {
    currentApps: [],
    currentlyViewing: {item: null},
    currentReviews: null
}

const appReducer = (state=INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.SET_APPS:{
            let {currentApps} = state;
            currentApps = action.payload;
            return {currentApps};
        }

        case actionTypes.APPEND_APPS:{
            const {currentApps} = state;
            const newApps = currentApps.concat(action.payload);
            return {currentApps: newApps};
        }
        case actionTypes.VIEW_APP:{
            return {currentlyViewing: {item: action.payload}}
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