import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ListProducts() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8003/getProduct");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Do You Want Delete!") == true) {
      await axios.delete(`http://localhost:8003/deleteProduct/${id}`);
    }
    loadUsers();
  };

  return (
    <div className="container">
      <div className="addPro">
        <Link className="btn btn-outline-danger" to={"/addProduct"}>
          Add Product
        </Link>
      </div>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">ProductName</th>
              <th scope="col">PointsRequired</th>
              <th scope="col">availableQuantity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.productName}</td>
                <td>{user.pointsRequired}</td>
                <td>{user.availableQuantity}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewproduct/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editproduct/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
