import { handleAlert, hideLoading, showLoading } from '../commonAction/actions';
import firebase from '../../../firebase/config';
import * as actions from './actionTypes';

const showPostModal = () => {
    return{
        type:actions.SHOW_POST_MODAL,
        payload:true
    }
}

const hidePostModal = () => {
    return{
        type:actions.HIDE_POST_MODAL,
        payload:false
    }
}

const addPost = (post) => (dispatch, getState, {getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();
    firestore.collection("posts").add(post).then(() => {
        dispatch(hideLoading());
        dispatch(hidePostModal());
        dispatch(handleAlert({text:"New post is added", status:"success"}));
    }).catch(err => {
        console.log(err);
    })
}

const fetchAllPosts = (post) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("posts").orderBy("time", "desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(item => docs.push({...item.data(), id: item.id}));
        dispatch({
            type: actions.FET_ALL_POSTS,
            payload: docs,
        })
    })
}

const updateLikePost = (status,postId, uid) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    if(status) {
        
        firestore.collection("posts").doc(postId).update({
            dislikes:firebase.firestore.FieldValue.arrayRemove(uid),
            likes: firebase.firestore.FieldValue.arrayUnion(uid),
        })
    }else{
        firestore.collection("posts").doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayRemove(uid),
        })
    }
}
const updateDisLikePost = (status,postId, uid) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    if(status) {
        firestore.collection("posts").doc(postId).update({
            likes:firebase.firestore.FieldValue.arrayRemove(uid),
            dislikes: firebase.firestore.FieldValue.arrayUnion(uid),
        })
    }else{
        firestore.collection("posts").doc(postId).update({
            dislikes: firebase.firestore.FieldValue.arrayRemove(uid),
        })
    }
}

const deletePost = (postId, comments) => (dispatch, getState, {getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();

    firestore.collection("posts").doc(postId).delete().then(() => {
        if(comments.length > 0) {
            for(let i = 0; i < comments.length; i++) {
                firestore.collection("comments").doc(comments[i]).delete().then(() => {
    
                }).catch(err => {
                    dispatch(handleAlert({text: err.message, status:"error"}))
                })
            } 
        }   
    }).then(() => {
        dispatch(hideLoading());
        dispatch(handleAlert({text: "Delete is done", status:"success"}));
    }).catch(err => {
        dispatch(hideLoading());

        dispatch(handleAlert({text: err.message, status:"error"}))
    });
}

const editPost = (id, content) => (dispatch, getState, {getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();
    firestore.collection("posts").doc(id).update(({
        content,
    })).then(() => {
        dispatch(handleAlert({text: "Edit is done", status:"success"}))
        dispatch(hideLoading());
    }).catch(err => {
        dispatch(hideLoading());
        dispatch(handleAlert({text: err.message, status:"error"}))
    })
}

const selectPost = (post) => {
    return{
        type: actions.SELECT_POST,
        payload:post,
    }
}

const dropPost = (post) => {
    return{
        type: actions.DROP_POST,
        payload:null,
    }
}

export {selectPost,dropPost,showPostModal,hidePostModal, addPost,fetchAllPosts, updateLikePost, updateDisLikePost, deletePost, editPost};