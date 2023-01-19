import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import AuthService from "../Services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vproductName = (value) => {
  if (value.length < 4 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The productname must be between 4 and 20 characters.
      </div>
    );
  }
};

const vavailableQuantity = (value) => {
  if (value.length < 0 || value.length <= 0) {
    return (
      <div className="alert alert-danger" role="alert">
        The Available Quantity must be more than 0.
      </div>
    );
  }
};

const vprice = (value) => {
  if (value.length <= 0) {
    return (
      <div className="alert alert-danger" role="alert">
        The price must be more than 0 .
      </div>
    );
  }
};

const CreateProduct = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeProductName = (e) => {
    const productName = e.target.value;
    setProductName(productName);
  };

  const onChangeProductDescription = (e) => {
    const productDescription = e.target.value;
    setProductDescription(productDescription);
  };

  const onChangeAvailableQuantity = (e) => {
    const availableQuantity = e.target.value;
    setAvailableQuantity(availableQuantity);
  };

  const onChangePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };
  
  const handleCreate = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {

      AuthService.createProduct(
        productName,availableQuantity,price,productDescription
      ).then(
        (response) => {
          setMessage(response.data.dataObject);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.errorObject.errorMessage) ||
            error.errorMessage ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleCreate} ref={form} enctype="multipart/form-data">
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Product Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="productName"
                  value={productName}
                  onChange={onChangeProductName}
                  validations={[required, vproductName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="productDescription" className="form-label">
                  Product Description
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
                  onChange={onChangeProductDescription}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="password">Available Quantity</label>
                <Input
                  type="number"
                  className="form-control"
                  name="availableQuantity"
                  value={availableQuantity}
                  onChange={onChangeAvailableQuantity}
                  validations={[required, vavailableQuantity]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Product Price</label>
                <Input
                  type="number"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChangePrice}
                  validations={[required, vprice]}
                />
              </div>

              <button className="btn btn-primary">Create Product</button>

                <Link className="btn btn-outline-secondary" id="cancel" to="/list">
                  Cancel
                </Link>

            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
              <Link className="btn btn-outline-info" to="/list">
                Back
              </Link>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
