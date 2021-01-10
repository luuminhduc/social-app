import * as actions from '../action/commonAction/actionTypes';

const initalState = {
    sideBar: false,
    isLight:true,
    alertList:[],
    loading:false,
}

export default function commonReducer(state = initalState, action) {
    const {payload} = action;
    switch(action.type) {
        case actions.TOGGLE_SIDE_BAR: return {...state, sideBar: !state.sideBar}
        case actions.SWITCH_LIGHT:return{...state, isLight: !state.isLight}
        case actions.ADD_ALERT: return {...state, alertList:[...state.alertList, payload]};
        case actions.REMOVE_ALERT:return {...state, alertList:[...state.alertList].filter(el => el.id !== payload)}
        case actions.SHOW_LOADING:case actions.HIDE_LOADING:return {...state, loading:payload};

        default: return state;
    }
}