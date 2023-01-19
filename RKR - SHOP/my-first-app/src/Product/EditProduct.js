import axios from "axios";
import React, { useState , useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authHeader from "../Services/auth-header";

export default function EditProduct() {
  
  let navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState({
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
    price,
  } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(product));
    await axios.put(`http://localhost:8001/product/updateProduct/${id}`,product,{ headers: authHeader() });
    navigate("/list");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8001/product/getProduct/${id}`,{ headers: authHeader() });
    setProduct(result.data.dataObject);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.productName) {
      errors.productName = "Product is Mandatory";
    } else if (values.productName.length < 4) {
      errors.productName = "Product Name Must be More Than 4 Characters";
    }
    if (!values.availableQuantity) {
      errors.availableQuantity = "Quantity is Mandatory";
    } else if (values.availableQuantity <= 0) {
      errors.availableQuantity = "Quantity Must be More Than 0";
    }

    if (!values.price) {
      errors.price = "price is Mandatory";
    } else if (values.price <= 0) {
      errors.price = "Price Must be More Than 0";
    }
    return errors;
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
                
              />
            </div>
            <p>{formErrors.productName}</p>

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
                
              />
            </div>
            <p>{formErrors.availableQuantity}</p>
            
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
              price
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter points"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
                
              />
            </div>
            <p>{formErrors.price}</p>

            <button type="submit" className="btn btn-outline-primary">
              Update Product
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/list">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
