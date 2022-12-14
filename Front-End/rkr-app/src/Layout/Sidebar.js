import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../Styles/Sidebar.css';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/productList">
        Product List
      </a>
      <a className="menu-item" href="/myAccount">
        My Account
      </a>
      <a className="menu-item" href="/orderHistory">
        Order History
      </a>
      <a className="menu-item" href="/userList">
        User List
      </a>
    </Menu>
  );
};