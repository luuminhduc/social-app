import * as actions from '../action/modalAction/actionTypes';

const initialState = {
    modal: false,
    text:'',
    title:'',
    callback:null,
}

export default function modalReducer(state = initialState, action) {
    const {payload} = action;
    switch(action.type) {
        case actions.SHOW_MODAL: {
            const {modal, title, text ,callback} = payload;
            return{...state, modal, title, text, callback}
        };
         case actions.HIDE_MODAL: return{...state, modal: payload,title: '', text:'' , callback:null};
        default: return state;
    }
}