import { handleAlert, hideLoading, showLoading } from '../commonAction/actions';
import * as actions from './actionTypes';

const registerRequest = (user) => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(showLoading());
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        user.email,
        user.password,
    ).then(res => {
        firestore.collection("users").doc(res.user.uid).set({
            userName: user.email,
            age:0,
            occupation:'',
            avatar:'',
            posts:[],
            friends:[],
            news:{
                count:0,
                list:[],
            },
            requests:[],
            requested:[],
        })
    }).then(() => {
        dispatch({
            type: actions.REGISTER_SUCCESS,
        })
        dispatch(hideLoading());
        dispatch(handleAlert({text:"Register is successful, you are log in", status:"success",id:Math.random()}));

    }).catch(err => {
        dispatch({
            type: actions.REGISTER_ERROR,
            payload: err.message
        })
        dispatch(hideLoading());

    })
}


export {registerRequest};