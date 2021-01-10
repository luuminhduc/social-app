import { AssignmentReturnRounded } from '@material-ui/icons';
import  * as actions from '../action/commentAction/actionTypes';

const initalState = {
    commentList:[],
}

export default function commentReducer(state=initalState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.FETCH_ALL_COMMENTS: return{...state, commentList:payload};
        default: return state;
    }
}