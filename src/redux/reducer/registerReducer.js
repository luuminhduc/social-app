import * as actions from '../action/registerAction/actionTypes';

const initialState = {
    authError :"",
} 

export default function registerReducer(state=initialState, action) {
    const{type, payload} = action;
    switch(type) {
        case actions.REGISTER_SUCCESS: return{...state, authError:null};
        case actions.REGISTER_ERROR:return{...state, authError:payload};
        default: return state;
    }
}