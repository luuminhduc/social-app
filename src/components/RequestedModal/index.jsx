import { Close } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  hideRequestedModal,
} from "../../redux/action/userAction/actions";
import { getUserName } from "../../utils/getUserName";

const RequestedModal = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const { requestedModal } = userReducer;

  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const { auth } = firebaseReducer;

  const dispatch = useDispatch();

  const loginReducer = useSelector((state) => state.loginReducer);

  const { userList } = userReducer;

  const { user } = loginReducer;

  const renderRequestedList = () => {
    const { requested } = user;
    return requested.length > 0
      ? requested.map((item, idx) => (
          <div
            className="shadow_sm item d-flex d-flex-row justify-between align-center"
            key={idx}
          >
            {renderUserItem(getUserName(userList, item))}
          </div>
        ))
      : "There is no new request";
  };

  const renderUserItem = (user) => {
    const { uid } = auth;
    const onAccept = () => {
      if (userList) dispatch(acceptRequest(uid, user.id, userList));
    };
    return (
      <React.Fragment>
        <div>
          <span>{user.userName}</span>
        </div>
        <button onClick={onAccept} className="btn_sm btn_primary">
          Accept
        </button>
      </React.Fragment>
    );
  };

  return requestedModal ? (
    <div className="modal">
      <div className="modal-content shadow_md">
        <span onClick={() => dispatch(hideRequestedModal())} className="cancel">
          <Close />
        </span>
        {user ? renderRequestedList() : ""}
      </div>
    </div>
  ) : (
    ""
  );
};

export default RequestedModal;
