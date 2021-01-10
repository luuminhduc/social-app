import { Face, Group, GroupAdd, People } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  return (
    <div className="sideBar shadow_sm">
      <NavLink className="sideBarItem" to={`/user/${auth.uid}`}>
        <Face />
        <span>Your self</span>
      </NavLink>

      <NavLink className="sideBarItem" to="/friends">
        <People />
        <span>Friends</span>
      </NavLink>

      <NavLink className="sideBarItem" to="/randomUsers">
        <GroupAdd />
        <span>People</span>
      </NavLink>
      {/* 
      <NavLink className="sideBarItem" to="/">
        <People />
        <span>Friends</span>
      </NavLink> */}
    </div>
  );
};

export default SideBar;
