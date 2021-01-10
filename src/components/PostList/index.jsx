import React, { useState } from "react";
import PostItem from "../PostItem";

const PostList = ({ list }) => {
  const [limit, setlimit] = useState(7);
  const onLimit = () => {
    if (limit < list.length) {
      setlimit(limit + 7);
    }
  };
  return (
    <React.Fragment>
      <div className="postList">
        {list?.slice(0, limit).map((item, idx) => (
          <PostItem key={idx} post={item} />
        ))}
      </div>
      <button onClick={onLimit} className="btn_sm more btn_secondary">
        More
      </button>
    </React.Fragment>
  );
};

export default PostList;
