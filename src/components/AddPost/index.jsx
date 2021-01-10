import React from "react";
import { useDispatch } from "react-redux";
import { showPostModal } from "../../redux/action/postAction/actions";
import AddPostModal from "../AddPostModal";

const AddPost = () => {
  const dispatch = useDispatch();

  return (
    <div className="addPost">
      <AddPostModal />
      <input
        className="input_btn shadow_md"
        value="What is on your mind....?"
        type="button"
        onClick={() => dispatch(showPostModal())}
      />
    </div>
  );
};

export default AddPost;
