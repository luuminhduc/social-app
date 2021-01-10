import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PostList from "../../components/PostList";
import { fetchAllPosts } from "../../redux/action/postAction/actions";
import { getUser } from "../../redux/action/userAction/actions";

const PersonalPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const history = useHistory();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const userReducer = useSelector((state) => state.userReducer);

  const { selectedUser } = userReducer;

  const { auth } = firebaseReducer;

  const { userId } = params;

  const postReducer = useSelector((state) => state.postReducer);

  const { postList } = postReducer;

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, params, userId]);

  useEffect(() => {
    if (!auth.uid) history.push("/login");
  }, [dispatch, history, auth]);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch, params]);

  const renderPosts = () => {
    const renderedArr = postList.filter((item) => item.uid === userId);
    return <PostList list={renderedArr} />;
  };

  return selectedUser ? (
    <div className="container container_md">
      <h1>{selectedUser.userName}</h1>
      <p>Age: {selectedUser.age}</p>
      <p>Job: {selectedUser.occupation}</p>
      {postList.length > 0 ? renderPosts() : ""}
    </div>
  ) : (
    ""
  );
};

export default PersonalPage;
