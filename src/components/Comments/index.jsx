import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUserName } from "../../utils/getUserName";

const Comments = ({ comments }) => {
  const userReducer = useSelector((state) => state.userReducer);
  const { userList } = userReducer;

  const getName = (uid) => {
    const name = getUserName(userList, uid).userName;
    return name;
  };

  const [show, setShow] = useState(false);

  return comments && comments.length > 0 ? (
    <div className="comments">
      {show ? (
        <div className="comments_list">
          {comments?.map((item, idx) => (
            <div key={idx} className="comment">
              <div className="d-flex d-flex-column justify-start align-start">
                <span className="meta_data">
                  {item.time
                    ? `${item.time.toDate().getDate()}/${
                        item.time.toDate().getMonth() + 1
                      }/${item.time.toDate().getYear()}`
                    : ""}
                </span>
                <span className="meta_data">{getName(item.uid)}</span>
              </div>
              <span className="comment_text">{item.content}</span>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <button onClick={() => setShow(!show)} className="btn_sm">
        {show ? "Hide comments" : "Show comments"}
      </button>
    </div>
  ) : (
    ""
  );
};

export default Comments;
