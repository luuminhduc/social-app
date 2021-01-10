import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/action/commentAction/actions";
import { timeStamp } from "../../firebase/config";

const AddCommentToPost = ({ postId }) => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const { auth } = firebaseReducer;

  const handleAdd = (e) => {
    e.preventDefault();
    const { uid } = auth;
    if (content && uid && postId) {
      const comment = {
        content,
        postId,
        uid,
        likes: [],
        dislikes: [],
        reply: [],
        time: timeStamp(),
      };
      dispatch(addComment(comment));
      setContent("");
    }
  };

  return (
    <div className="addCommmentToPost">
      <form onSubmit={handleAdd}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Add a public comment"
        />
      </form>
    </div>
  );
};

export default AddCommentToPost;
