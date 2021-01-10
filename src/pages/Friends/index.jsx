import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserCardItem from "../../components/UserCardItem";
import { getAllUsers } from "../../redux/action/userAction/actions";

const Friends = () => {
  const loginReducer = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const userReducer = useSelector((state) => state.userReducer);

  const { userList } = userReducer;

  const { auth } = firebaseReducer;

  const { user } = loginReducer;

  const history = useHistory();

  useEffect(() => {
    if (!auth.uid) history.push("/login");
  }, [history, auth]);

  useEffect(() => {
    if (userList.length <= 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, userList.length]);

  const renderFriends = () => {
    const { friends } = user;
    const renderedArr = userList.filter((el) => friends.includes(el.id));
    return (
      <div className="users_list">
        {renderedArr?.map((item, idx) => (
          <div key={idx} className="list_item">
            <UserCardItem user={item} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container container_md users">
      <h1>Friends</h1>
      {user?.friends.length > 0 ? renderFriends() : "No friends"}
    </div>
  );
};

export default Friends;
