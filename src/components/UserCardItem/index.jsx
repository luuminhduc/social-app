import { Person } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  requestFriend,
  unFriend,
} from "../../redux/action/userAction/actions";

const UserCardItem = ({ user }) => {
  const { avatar, userName, id, friends } = user;

  const loginReducer = useSelector((state) => state.loginReducer);

  const currentUser = loginReducer.user;

  const dispatch = useDispatch();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const userReducer = useSelector((state) => state.userReducer);

  const { userList } = userReducer;

  const { auth } = firebaseReducer;

  const onRequest = () => {
    const { uid } = auth;
    const { requests } = currentUser;

    if (!requests.includes(id)) {
      if (userList) dispatch(requestFriend(uid, id, userList));
    }
  };

  const getStatus = () => {
    const { uid } = auth;
    let status = "";
    if (currentUser.friends.includes(id) && friends.includes(uid)) {
      status = "Friend";
    } else {
      if (currentUser.requests.includes(id)) {
        status = "Requesting...";
      } else {
        status = "stranger";
      }
    }
    return status;
  };

  const onCancel = () => {
    const { uid } = auth;
    dispatch(cancelRequest(uid, id));
  };

  const onAccept = () => {
    const { uid } = auth;
    if (userList) dispatch(acceptRequest(uid, id, userList));
  };

  const displayButtonStatus = () => {
    const { uid } = auth;

    const onUnfriend = () => {
      dispatch(unFriend(uid, id));
    };

    if (currentUser.friends.includes(id) && friends.includes(uid)) {
      return (
        <button onClick={onUnfriend} className="btn_sm btn_primary">
          Unfriend
        </button>
      );
    } else {
      if (currentUser.requests.includes(id)) {
        return (
          <button onClick={onCancel} className="btn_sm btn_primary">
            Cancel
          </button>
        );
      } else if (user.requests.includes(uid)) {
        return (
          <button onClick={onAccept} className="btn_sm btn_primary">
            Accept
          </button>
        );
      } else {
        return (
          <button onClick={onRequest} className="btn_sm">
            Request
          </button>
        );
      }
    }
  };

  return currentUser ? (
    <div className="card randomUser_item">
      <div className="card_img">{avatar ? "" : <Person />}</div>
      <p>
        <NavLink to={`/user/${id}`} className="link_dark">
          {userName}
        </NavLink>
      </p>
      <span className="status_friend">{getStatus()}</span>
      {displayButtonStatus()}
    </div>
  ) : (
    ""
  );
};

export default UserCardItem;
