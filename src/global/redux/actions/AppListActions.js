import actionTypes from './index';

export const setApps = apps => ({
    type: actionTypes.SET_APPS,
    payload: apps
})

export const appendApps = apps => ({
    type: actionTypes.APPEND_APPS,
    payload: apps
})