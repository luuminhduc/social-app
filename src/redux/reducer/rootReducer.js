import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import commonReducer from './commonReducer';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import  commentReducer from './commentReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    firebaseReducer,
    commonReducer,
    registerReducer,
    loginReducer,
    userReducer,
    postReducer,
    commentReducer,
    modalReducer,
})