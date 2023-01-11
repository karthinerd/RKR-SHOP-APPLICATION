import React, { useState,useEffect } from "react";
import AuthService from "../Services/auth.service";
import axios from "axios";
import authHeader from "../Services/auth-header";

const OrderHistory = () => {

  const [order,setOrder] = useState([]);

 const currentUser = AuthService.getCurrentUser();

 useEffect(() => {
  loadUser();
}, []);

 const loadUser = async () => {
  const result = await axios.get(`http://localhost:8001/product/order/orderHistory/${currentUser.dataObject.id}`,{ headers: authHeader() });
  setOrder(result.data.dataObject);
};


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.dataObject.username}</strong> Order History
        </h3>
      </header>
      <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Order Placed By</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Order Placed Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Product Name</th>
            </tr>
          </thead>
          <tbody>
              {order.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.user.username}</td>
                <td>{user.amount}</td>
                <td>{user.orderPlacedAt}</td>
                <td>{user.cartItems[0].quantity}</td>
                <td>{user.cartItems[0].productName}</td>
                <td></td>
            {/* {order.cartItems.map(user => (
                <div key={user.name}>
                    <td>{user.productName}</td>
                    <p>{user.role}</p>
                </div>
            ))} */}
                  {/* <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${currentUser.dataObject.id}`}
                  >
                    Edit
                  </Link> */}
              </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
};

export default OrderHistory;
