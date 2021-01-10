import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dropPost,
  editPost,
  hidePostModal,
} from "../../redux/action/postAction/actions";
import { timeStamp } from "../../firebase/config";
import { addPost } from "../../redux/action/postAction/actions";

const AddPostModal = () => {
  const [content, setContent] = useState("");

  const postReducer = useSelector((state) => state.postReducer);

  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const { auth } = firebaseReducer;

  const dispatch = useDispatch();

  const { addModal, selectedPost } = postReducer;

  useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.content);
    }
  }, [dispatch, selectedPost]);

  const onAddPost = () => {
    const time = timeStamp();
    if (content) {
      const post = {
        content,
        uid: auth.uid,
        likes: [],
        dislikes: [],
        comments: [],
        time,
      };
      dispatch(addPost(post));
      setContent("");
    }
  };

  const onEditPost = () => {
    const { id } = selectedPost;
    dispatch(editPost(id, content));
    dispatch(dropPost());
    dispatch(hidePostModal());
  };

  return addModal ? (
    <div className="modal">
      <div className="modal-content shadow_sm">
        <button
          onClick={() => dispatch(hidePostModal())}
          className="btn_sm cancel"
        >
          <Close />
        </button>
        {selectedPost ? <h3>Edit</h3> : <h3>Let people know what you think</h3>}
        <div className="edit-container">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            type="text"
          />
          {selectedPost ? (
            <button onClick={onEditPost} className="btn_md btn_primary">
              Edit
            </button>
          ) : (
            <button onClick={onAddPost} className="btn_md btn_primary">
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddPostModal;
