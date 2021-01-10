import { Check, Close, Error, Info, Warning } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "../../redux/action/commonAction/actions";

const AlertList = () => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();

  const formatIcon = (status) => {
    switch (status) {
      case "success":
        return <Check />;
      case "warning":
        return <Warning />;
      case "error":
        return <Error />;
      case "info":
        return <Info />;
      default:
        return;
    }
  };

  const { alertList } = commonReducer;
  return alertList.length > 0 ? (
    <div className="alertList">
      {alertList.map((el, idx) => (
        <div key={idx} className={`alert_${el.status} shadow_sm alert-gone`}>
          <div className="alert-text d-flex flex-row justify-start align-center">
            <span style={{ marginRight: "5px" }}>{formatIcon(el.status)}</span>
            <span>{el.text}</span>
          </div>
          <span
            onClick={(e) => {
              dispatch(removeAlert(el.id));
            }}
            className="icon"
          >
            <Close />
          </span>
        </div>
      ))}
    </div>
  ) : (
    ""
  );
};

export default AlertList;
