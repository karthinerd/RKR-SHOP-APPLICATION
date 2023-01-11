
import authHeader from "../Services/auth-header";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProduct() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8001/product/getProduct",{ headers: authHeader() });
    setUsers(result.data.dataObject);
  };


  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Available Quantity</th>
              <th>Product Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.productName}</td>
                <td>{user.price}</td>
                <td>{user.availableQuantity}</td>
                <td>{user.productDescription}</td>
                <td>
                <Link
                    to={"/placeOrder"}
                  >  
                  <button
                    className="btn btn-danger mx-2"
                  >
                    Order
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
