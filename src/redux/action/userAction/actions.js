import { handleAlert, hideLoading, showLoading } from '../commonAction/actions';
import {getUserName} from '../../../utils/getUserName';
import * as actions from './actionTypes';
import firebase from '../../../firebase/config';

const getUser = (id) => (dispatch, getState,{getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();
    firestore.collection("users").doc(id).get().then((doc) => {
        dispatch(hideLoading());
        dispatch({
            type: actions.GET_USER,
            payload: {...doc.data(), id: doc.id}
        })
    }).catch(err => {
        dispatch(hideLoading());

        console.log(err);
    })
}

const updateUser = (user, id) => (dispatch, getState,{getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();
    firestore.collection("users").doc(id).set({...user}).then(() => {
        dispatch(hideLoading());
        dispatch(handleAlert({text: "Update is done", status:"success"}));
    }).catch(err=>{
        dispatch(hideLoading())
        console.log(err);
    })
}

const getAllUsers = () => (dispatch, getState,{getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("users").onSnapshot(snap => {
        const docs = [];
        snap.forEach(item => docs.push({...item.data(), id: item.id}));
        dispatch({
            type: actions.GET_ALL_USERS,
            payload:docs,
        })

    })
}

const requestFriend = (id, requestedId, userList) => (dispatch, getState,{getFirestore}) => {
    const firestore = getFirestore();

    const user = getUserName(userList, id);

    firestore.collection("users").doc(id).update({
        requests:firebase.firestore.FieldValue.arrayUnion(requestedId), 
    })
    firestore.collection("users").doc(requestedId).update({
        requested:firebase.firestore.FieldValue.arrayUnion(id),
        count: firebase.firestore.FieldValue.increment(1),
        news: firebase.firestore.FieldValue.arrayUnion({
            text:`${user.userName} has sent you a request`,
            time:new Date(),
        })
    })
}

const cancelRequest = (id, requestedId) => (dispatch, getState,{getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection("users").doc(id).update({
        requests:firebase.firestore.FieldValue.arrayRemove(requestedId),
    })
    firestore.collection("users").doc(requestedId).update({
        requested:firebase.firestore.FieldValue.arrayRemove(id),
    })

}

const showRequestedModal = () => {
    return{
        type:actions.SHOW_REQUESTED_MODAL,
        payload:true
    }
}

const hideRequestedModal = () => {
    return{
        type:actions.HIDE_REQUESTED_MODAL,
        payload:false
    }
}

const acceptRequest = (id, acceptId, userList) => (dispatch, getState,{getFirestore}) => {
    const firestore = getFirestore();

    const user = getUserName(userList, id);

    firestore.collection("users").doc(id).update({
        requested:firebase.firestore.FieldValue.arrayRemove(acceptId),
        friends:firebase.firestore.FieldValue.arrayUnion(acceptId),
    })
    firestore.collection("users").doc(acceptId).update({
        requests:firebase.firestore.FieldValue.arrayRemove(id),
        friends:firebase.firestore.FieldValue.arrayUnion(id),        
        news: firebase.firestore.FieldValue.arrayUnion({
            text:`${user.userName} has accepted your request`,
            time:new Date(),
        }),
        count:firebase.firestore.FieldValue.increment(1),
    })
}

const unFriend = (id, friendId) => (dispatch, getState,{getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("users").doc(id).update({
        friends:firebase.firestore.FieldValue.arrayRemove(friendId),
    })
    firestore.collection("users").doc(friendId).update({
        friends:firebase.firestore.FieldValue.arrayRemove(id),
    })
}


const resetCount =(id) => (dispatch, getState,{getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("users").doc(id).update({
        count:0,
    })
}
export {
    acceptRequest,
    getUser,
    updateUser,
    getAllUsers,
    requestFriend,
    cancelRequest,
    showRequestedModal,
    hideRequestedModal,
    unFriend,
    resetCount
};