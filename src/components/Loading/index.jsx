import React from "react";
import { useSelector } from "react-redux";

const Loading = ({ status }) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const { loading } = commonReducer;
  return loading || status ? (
    <div className="loading">
      <div className="loader-container">
        <div className="loader load-1"></div>
        <div className="loader load-2"></div>
        <div className="loader load-3"></div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Loading;
