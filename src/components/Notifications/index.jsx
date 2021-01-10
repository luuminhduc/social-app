import React, { useState } from "react";
import { useSelector } from "react-redux";

const Notifications = () => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { user } = loginReducer;

  const [limit, setLimit] = useState(5);

  const renderNews = (item) => {
    const time = item.time.toDate();
    return (
      <React.Fragment>
        <small>
          {time
            ? `${time.getDate()} / ${
                time.getMonth() + 1
              } / ${time.getFullYear()}`
            : ""}
        </small>
        <p>{item.text}</p>
      </React.Fragment>
    );
  };

  return (
    <div className="notifications shadow_md">
      {user.news?.slice(0, 5).map((item, idx) => (
        <div className="item" key={idx}>
          {renderNews(item)}
        </div>
      ))}
      {user && user.news.length > 5 ? (
        <button
          onClick={() => setLimit((limit += 5))}
          className="btn_sm btn_primary"
        >
          More
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notifications;
