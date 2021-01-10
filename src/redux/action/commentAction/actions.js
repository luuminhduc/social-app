import * as actions from './actionTypes';

const addComment = (comment) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("comments").add(comment).then(() => {
    }).catch(err => {
        console.log(err);
    })
}

const fetchAllComments = (comment) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("comments").onSnapshot(snap => {
        const docs = [];
        snap.forEach(item => docs.push({...item.data(), id:item.id}));
        dispatch({
            type: actions.FETCH_ALL_COMMENTS,
            payload: docs,
        })
    })
}

export {addComment, fetchAllComments};