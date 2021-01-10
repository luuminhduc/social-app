import * as actions from './actionTypes';

const showModal = ({title, text, callback}) => {
    return {
        type: actions.SHOW_MODAL,
        payload: {modal:true,title, text, callback},
    }
}

const hideModal = () => {
    return {
        type: actions.HIDE_MODAL,
        payload: false,
    }
}

export {showModal, hideModal};