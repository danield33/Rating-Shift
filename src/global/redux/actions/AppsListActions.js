export const setApps = apps => (
    {
        type: 'SET_APPS',
        payload: apps,
    }
)

export const appendApps = apps => (
    {
        type: 'APPEND_APPS',
        payload: apps
    }
)