import React from "react";
import { useSelector } from "react-redux";
import PostList from "../PostList";

const DashBoardContents = () => {
  const postReducer = useSelector((state) => state.postReducer);
  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const loginReducer = useSelector((state) => state.loginReducer);

  const { user } = loginReducer;

  const { friends } = user;

  const { auth } = firebaseReducer;
  const { postList } = postReducer;

  const renderPosts = () => {
    const renderedArr = postList.filter(
      (el) => el.uid === auth.uid || friends.includes(el.uid)
    );
    return <PostList list={renderedArr} />;
  };

  return (
    <div className="dashboardContent">{postList ? renderPosts() : ""}</div>
  );
};

export default DashBoardContents;
