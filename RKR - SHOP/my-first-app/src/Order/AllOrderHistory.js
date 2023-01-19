import React, { useState,useEffect } from "react";
import AuthService from "../Services/auth.service";
import axios from "axios";
import authHeader from "../Services/auth-header";
import _ from "lodash";

const AllOrderHistory = () => {

  const [order,setOrder] = useState([]);

  const pageSize = 10 ;

  const [paginatedPosts,setPaginatedPosts] = useState([]);

  const [currentPage , setCurrentPage] = useState(1);

  const pageCount = order? Math.ceil(order.length/pageSize):0;

  const pages = _.range(1,pageCount+1);

  const pagination = (pageno)=>{
    setCurrentPage(pageno);
    const startIntex = (pageno - 1) * pageSize;
    const paginatedPost = _(order).slice(startIntex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }

 const currentUser = AuthService.getCurrentUser();

 useEffect(() => {
  loadUser();
}, []);

 const loadUser = async () => {
  const result = await axios.get(`http://localhost:8001/product/order/orderHistory`,{ headers: authHeader() });
  setOrder(result.data.dataObject);
  setPaginatedPosts(_(result.data.dataObject).slice(0).take(pageSize).value());
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
              <th scope="col">Order Id</th>
              <th scope="col">Order Placed By</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Order Placed Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Product Name</th>
            </tr>
          </thead>
          <tbody>
              {paginatedPosts.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {/* {index + 1} */}
                  {user.id}
                </th>
                <td>{user.orderPlacedBy}</td>
                <td>{user.amount}</td>
                <td>{user.orderPlacedAt}</td>
                <td>{user.quantity}</td>
                <td>{user.productName}</td>
                <td></td>
              </tr>
              ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {
              pages.map((page)=>(
                <li className={
                  page === currentPage ? "page-item active" : "page-item"
                }>
                  <p className="page-link"
                  onClick={()=>pagination(page)}
                  >{page}</p>
                  </li>
              ))
            }
          </ul>
        </nav>
    </div>
  );
};

export default AllOrderHistory;
