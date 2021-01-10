import * as actions from '../action/userAction/actionTypes';

const initialState = {
    selectedUser:null,
    userList:[],
    requestedModal:false,
}

export default function userReducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.GET_USER:return {...state, selectedUser:payload};
        case actions.GET_ALL_USERS:return{...state, userList:payload};
        case actions.SHOW_REQUESTED_MODAL: case actions.HIDE_REQUESTED_MODAL:return {...state, requestedModal:payload};
        default:return state;
    }
}