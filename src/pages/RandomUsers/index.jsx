import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserCardItem from "../../components/UserCardItem";
import { getAllUsers } from "../../redux/action/userAction/actions";

const RandomUsers = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const { auth } = firebaseReducer;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.uid) history.push("/login");
  }, [history, auth]);

  const renderRandomUsers = () => {
    const renderedList = userList.filter((el) => el.id !== auth.uid);
    return (
      <div className="users_list">
        {renderedList?.map((item, idx) => (
          <div key={idx} className="list_item">
            <UserCardItem user={item} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container container_md users">
      <h1>Random Users</h1>
      {renderRandomUsers()}
    </div>
  );
};

export default RandomUsers;
