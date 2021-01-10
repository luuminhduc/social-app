import {
  FaceSharp,
  NotificationImportant,
  PeopleOutline,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCurrentUser, logOut } from "../../redux/action/loginAction/actions";
import {
  resetCount,
  showRequestedModal,
} from "../../redux/action/userAction/actions";
import Notifications from "../Notifications";

const SimpleHeader = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;

  useEffect(() => {
    if (auth.uid) {
      dispatch(getCurrentUser(auth.uid));
    }
  }, [auth, dispatch, user]);

  const getAvatar = () => {
    if (user) {
      if (user.avatar) {
      } else {
        return <FaceSharp />;
      }
    } else {
      return "";
    }
  };

  const onNews = () => {
    setShow(!show);
    dispatch(resetCount(auth.uid));
  };

  return (
    <div className="header shadow_md">
      <h2>
        <NavLink className="link" to="/">
          App
        </NavLink>
      </h2>
      <div className="header-actions">
        {auth.uid && user ? (
          <React.Fragment>
            <div className="btn_sm btn_default news">
              <NotificationImportant onClick={onNews} />
              {show ? <Notifications /> : ""}
              {user && user.count > 0 ? (
                <span className="badge_waring">{user.count}</span>
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => dispatch(logOut())}
              className="btn_sm btn_default"
            >
              Logout
            </button>
            <NavLink to="/accountSetting" className="btn_sm btn_defaut link">
              {getAvatar()}
              {user ? user.userName : ""}
            </NavLink>
            <div
              onClick={() => dispatch(showRequestedModal())}
              className="btn_sm btn_default"
            >
              <PeopleOutline />
              {user && user.requested.length > 0 ? (
                <span className="badge_waring">{user.requested.length}</span>
              ) : (
                ""
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink
              activeClassName="active_link"
              className="link btn_sm btn_default"
              to="/register"
            >
              Register
            </NavLink>

            <NavLink
              activeClassName="active_link"
              className="link btn_sm btn_default"
              to="/login"
            >
              Login
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default SimpleHeader;
