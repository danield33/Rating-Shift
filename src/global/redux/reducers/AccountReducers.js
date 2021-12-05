import actionTypes from '../actions';

const INITIAL_STATE = {
    currentUser: null
}

const accountReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.CHANGE_AUTHENTICATION:
            return {currentUser: action.payload}

    }

    return state;

}


export default accountReducer;