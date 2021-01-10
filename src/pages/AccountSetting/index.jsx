import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../redux/action/userAction/actions";

const AccountSetting = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  const { register, errors, watch, handleSubmit, setValue } = useForm();

  const loginReducer = useSelector((state) => state.loginReducer);

  const { user } = loginReducer;

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!auth.uid) history.push("/login");
  }, [dispatch, history, auth]);

  useEffect(() => {
    if (user && !watch("userName") && !watch("age") && !watch("occupation")) {
      setValue("userName", user.userName);
      setValue("age", user.age);
      setValue("occupation", user.occupation);
    }
  }, [user, setValue, watch]);

  const onSubmit = (data) => {
    const { userName, age, occupation } = data;
    const userId = auth.uid;
    const newUser = { ...user, userName, age, occupation };
    dispatch(updateUser(newUser, userId));
  };

  return (
    <div className="accountSetting container container_md">
      <h1>Setting</h1>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="setting"
      >
        <div className="form-control">
          <label>User name</label>
          <input
            ref={register({ required: true })}
            name="userName"
            type="text"
            className={errors.userName ? "error" : ""}
          />
          <small>
            {errors.userName && errors.userName.type === "required"
              ? "User name can not be blank"
              : ""}
          </small>
        </div>
        <div className="form-control">
          <label>Age</label>
          <input
            ref={register({ required: true })}
            name="age"
            type="number"
            className={errors.age ? "error" : ""}
          />
          <small>
            {errors.age && errors.age.type === "required"
              ? "Age can not be blank"
              : ""}
          </small>
        </div>
        <div className="form-control">
          <label>Occupation</label>
          <input
            ref={register({ required: true })}
            name="occupation"
            type="text"
            className={errors.occupation ? "error" : ""}
          />
          <small>
            {errors.occupation && errors.occupation.type === "required"
              ? "Occupation can not be blank"
              : ""}
          </small>
        </div>
        <button className="btn_md btn_primary">Save</button>
      </form>
    </div>
  );
};

export default AccountSetting;
