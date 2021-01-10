import * as actions from '../action/loginAction/actionTypes';

const initalState = {
    authError : '',
    user:null,
}

export default function loginReducer(state=initalState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.LOGIN_ERROR: return{...state, authError: payload};
        case actions.LOGIN_SUCCESS:return{...state, authError: null};
        case actions.LOG_OUT:return{...state, authError:null}
        case actions.GET_CURRENT_USER:return{...state, user:payload}
        default: return state;
    }
}