import axios from "axios";
import React, { useState , useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    productName: "",
    productDescription: "",
    availableQuantity: "",
    productImage: "",
    pointsRequired: "",
  });

  const {
    productName,
    productDescription,
    availableQuantity,
    productImage,
    pointsRequired,
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8003/updateProduct/${id}`, user);
    navigate("/productList");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8003/getProduct/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Product</h2>

          <form onSubmit={(e) => onSubmit(e)} autoComplete="off">
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                productName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter productName"
                name="productName"
                value={productName}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                productDescription
              </label>

              <label for="productDescription" class="form-label"></label>
              <textarea
                class="form-control"
                name="productDescription"
                id=""
                rows="3"
                className="form-control"
                placeholder="Description Box"
                value={productDescription}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="AvailableQuantity" className="form-label">
                AvailableQuantity
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter AvailableQuantity"
                name="availableQuantity"
                value={availableQuantity}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            
            <div class="mb-3">
              <label for="formFile" class="form-label">
                productImage
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                name="productImage"
                value={productImage}
                onChange={(e) => onInputChange(e)}
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pointsRequired" className="form-label">
                pointsRequired
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter points"
                name="pointsRequired"
                value={pointsRequired}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Update Product
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/productList">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
