import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/auth.service";

const Sidebar = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const [showUserBoard, setShowUserBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowUserBoard(user.dataObject.roles.includes("ROLE_USER"));
      setShowAdminBoard(user.dataObject.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <Menu>
      <Link to={"/"} className="menu-item">
      <i class="fa fa-home"></i>
         Home
      </Link>
      {showAdminBoard && (
        <Link to={"/profile"} className="menu-item">
          My Account
        </Link>
      )}
        {showUserBoard && (
        <Link to={"/profile"} className="menu-item">
          My Account
        </Link>
      )}
      {showAdminBoard && (
        <Link to={"/list"} className="menu-item">
          Product List
        </Link>
      )}
      {showUserBoard && (
        <Link to={"/userProduct"} className="menu-item">
          Product List
        </Link>
      )}
      {showAdminBoard && (
        <Link to={"/userList"} className="menu-item">
          User List
        </Link>
      )}
      {showAdminBoard &&(
        <a className="menu-item" href="/allOrderHistory">
          Order History
        </a>
      )}
      {showAdminBoard &&(
        <a className="menu-item" href="/activityLog">
          Activity Log
        </a>
      )}
      {showUserBoard && (
        <a className="menu-item" href="/orderHistory">
          Order History
        </a>
      )}
    </Menu>
  );
};

export default Sidebar;
