import { Box } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/action/modalAction/actions";

const CommonModal = () => {
  const modalReducer = useSelector((state) => state.modalReducer);
  const { modal, title, text, callback } = modalReducer;

  console.log(callback);

  const dispatch = useDispatch();

  const handleOk = async () => {
    dispatch(callback());
    dispatch(hideModal());
  };

  return modal ? (
    <div className="modal">
      <div className="modal-content shadow_md">
        <span onClick={() => dispatch(hideModal())} className="close">
          <Close />
        </span>
        <h1>{title}</h1>
        <p>{text}</p>
        <Box display="flex" flexDirection="row" justifyContent="flex-start">
          <button className="btn_sm btn_info" onClick={handleOk}>
            Ok
          </button>
          {callback ? (
            <button className="btn_sm" onClick={() => dispatch(hideModal())}>
              Cancel
            </button>
          ) : (
            ""
          )}
        </Box>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CommonModal;
