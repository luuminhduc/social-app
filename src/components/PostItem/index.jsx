import {
  Delete,
  Edit,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/action/userAction/actions";
import { getUserName } from "../../utils/getUserName";
import {
  deletePost,
  selectPost,
  showPostModal,
  updateDisLikePost,
  updateLikePost,
} from "../../redux/action/postAction/actions";
import AddCommentToPost from "../AddCommentToPost";
import { fetchAllComments } from "../../redux/action/commentAction/actions";
import Comments from "../Comments";
import { showModal } from "../../redux/action/modalAction/actions";

const PostItem = ({ post }) => {
  const [comments, setComments] = useState([]);
  const { content, time, likes, dislikes, id, uid } = post;

  const getTime = time?.toDate();
  const dispatch = useDispatch();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const commentReducer = useSelector((state) => state.commentReducer);

  const postReducer = useSelector((state) => state.postReducer);

  const { postList } = postReducer;

  const { commentList } = commentReducer;

  const { auth } = firebaseReducer;

  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (commentList.length <= 0) {
      dispatch(fetchAllComments());
    }
  }, [dispatch, commentList]);

  useEffect(() => {
    const newComments = commentList.filter((el) => el.postId === id);
    setComments(newComments);
  }, [dispatch, commentList, postList]);

  const getName = (uid) => {
    const user = getUserName(userList, uid);
    return user ? user.userName : "sds";
  };

  const onLike = () => {
    const { uid } = auth;
    if (likes.includes(uid)) {
      dispatch(updateLikePost(false, id, uid));
    } else {
      dispatch(updateLikePost(true, id, uid));
    }
  };

  const onDisLike = () => {
    const { uid } = auth;
    if (dislikes.includes(uid)) {
      dispatch(updateDisLikePost(false, id, uid));
    } else {
      dispatch(updateDisLikePost(true, id, uid));
    }
  };

  const onDelete = () => {
    const deletedComments = commentList
      .filter((el) => el.postId === id)
      .map((el) => el.id);
    dispatch(
      showModal({
        title: "Delete",
        text: "Are you sure about this?",
        callback: () => deletePost(id, deletedComments),
      })
    );
  };

  const onEdit = () => {
    dispatch(selectPost(post));
    dispatch(showPostModal());
  };

  return (
    <div className="postItem card">
      <div className="post_item_info d-flex d-flex-row justify-between align-center">
        <div className="d-flex d-flex-column justify-start align-start">
          <small>
            {time
              ? `${getTime.getDate()} / ${
                  getTime.getMonth() + 1
                } / ${getTime.getFullYear()}`
              : ""}
          </small>
          <small>{userList.length > 0 ? getName(post.uid) : ""}</small>
        </div>
        {uid === auth.uid ? (
          <div className="post_item_actions">
            <span>
              <Edit onClick={onEdit} />
            </span>
            <span onClick={onDelete}>
              <Delete />
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="postItem_content">{content}</p>
      <div className="d-flex m-3 d-flex-row justify-between align-center">
        <div className="d-flex d-flex-column justify-start align-start">
          <span
            onClick={onLike}
            className={`thumb ${likes.includes(auth.uid) ? "has" : ""}`}
          >
            <ThumbUpOutlined />
          </span>
          <span>{likes.length}</span>
        </div>
        <div className="d-flex d-flex-column justify-start align-start">
          <span
            onClick={onDisLike}
            className={`thumb ${dislikes.includes(auth.uid) ? "has" : ""}`}
          >
            <ThumbDownOutlined />
          </span>
          <span>{dislikes.length}</span>
        </div>
        <div className="d-flex d-flex-column justify-start align-start">
          <span className="">{comments.length} Comments</span>
        </div>
      </div>
      <Comments comments={comments} />
      <AddCommentToPost postId={id} />
    </div>
  );
};

export default PostItem;
