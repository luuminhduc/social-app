import * as actions from './actionTypes';

const toggleSideBar = () => {
    return{
        type: actions.TOGGLE_SIDE_BAR,
    }
}

const switchLight = () => {
    return{type: actions.SWITCH_LIGHT}
}

const addAlert = (alert) => {
    return{
        type: actions.ADD_ALERT,
        payload:alert
    }
}

const removeAlert = (id) => {
    return{
        type: actions.REMOVE_ALERT,
        payload:id,
    }
}

const handleAlert = (alert) => dispatch => {
    const id = Math.random();
    dispatch(addAlert({...alert, id}));
    setTimeout(() => {
        dispatch(removeAlert(id))
    }, 4000)
}

const showLoading = () => {
    return{
        type: actions.SHOW_LOADING,
        payload:true,
    }
}

const hideLoading = () => {
    return {
        type: actions.HIDE_LOADING,
        payload: false,
    }
}


export {toggleSideBar, switchLight, handleAlert, removeAlert, showLoading, hideLoading};