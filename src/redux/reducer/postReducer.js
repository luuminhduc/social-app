import * as actions from '../action/postAction/actionTypes';

const initialState = {
    addModal:false,
    postList:[],
    selectedPost:null,
}

export default function postReducer(state=initialState, action){
    const {type, payload} = action;
    switch(type) {
        case actions.SHOW_POST_MODAL: case actions.HIDE_POST_MODAL:return {...state, addModal:payload};
        case actions.FET_ALL_POSTS:return{...state, postList:payload};
        case actions.SELECT_POST: case actions.DROP_POST :return{...state, selectedPost:payload}
        default: return state;
    }
}