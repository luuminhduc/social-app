import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddPost from "../../components/AddPost";
import DashBoardContents from "../../components/DashBoardContents";
import SideBar from "../../components/SideBar";
import { fetchAllPosts } from "../../redux/action/postAction/actions";
import { fetchAllComments } from "../../redux/action/commentAction/actions";
import { getAllUsers } from "../../redux/action/userAction/actions";
import { getUserName as getUser } from "../../utils/getUserName";
import { handleAlert } from "../../redux/action/commonAction/actions";

const DashBoard = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const loginReducer = useSelector((state) => state.loginReducer);

  const userReducer = useSelector((state) => state.userReducer);

  const { userList } = userReducer;

  const { user } = loginReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const history = useHistory();

  useEffect(() => {
    if (!auth.uid) history.push("/login");
  }, [history, auth]);

  return user ? (
    <div className="dashboard container">
      <div className="container_md">
        <AddPost />
      </div>
      <div className="container_md">
        <DashBoardContents />
      </div>
      <SideBar />
    </div>
  ) : (
    ""
  );
};

export default DashBoard;
