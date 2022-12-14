import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function ViewProduct() {

  const [user, setUser] = useState({
    productName: "",
    productDescription: "",
    availableQuantity: "",
    productImage: "",
    pointsRequired: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8003/getProduct/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Product Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Product id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Product Name : </b>
                  {user.productName}
                </li>
                <li className="list-group-item">
                  <b> Available Quantity : </b>
                  {user.availableQuantity}
                </li>
                <li className="list-group-item">
                  <b>Points Required : </b>
                  {user.pointsRequired}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/productList"}>
            Back to Product List
          </Link>
        </div>
      </div>
    </div>
  );
}
