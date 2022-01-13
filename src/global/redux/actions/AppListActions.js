import actionTypes from './index';

export const setApps = apps => ({
    type: actionTypes.SET_APPS,
    payload: apps
})

export const appendApps = apps => ({
    type: actionTypes.APPEND_APPS,
    payload: apps
})


export const viewApp = app => ({
    type: actionTypes.VIEW_APP,
    payload: app
})

export const setReviews = reviews => ({
    type: actionTypes.SET_REVIEWS,
    payload: reviews
})

export const changeAuthentication = user => ({
    type: actionTypes.CHANGE_AUTHENTICATION,
    payload: user
})