import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../Services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vcustomerName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The Customer Name must be between 3 and 20 characters.
      </div>
    );
  }
};


const vphoneNumber = (value) => {
  if (value.length < 0) {
    return (
      <div className="alert alert-danger" role="alert">
        The  Quantity must be More than 0
      </div>
    );
  }
};



const OrderPlace = () => {
  const form = useRef();
  const checkBtn = useRef();
   let navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productId, setProductId] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setCustomerName(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setCustomerEmail(email);
  };


  const onChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setQuantity(phoneNumber);
  };

  const onChangePoints = (e) => {
    const points = e.target.value;
    setProductId(points);
  };


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.order(productId,quantity,customerEmail,customerName).then(
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
    navigate("/productList")
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h1>Order Screen</h1>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Customer Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={customerName}
                  onChange={onChangeUsername}
                  validations={[required, vcustomerName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Customer Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={customerEmail}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Product Quantity</label>
                <Input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={quantity}
                  onChange={onChangePhoneNumber}
                  validations={[required, vphoneNumber]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Product Id</label>
                <Input
                  type="number"
                  className="form-control"
                  name="points"
                  value={productId}
                  onChange={onChangePoints}
                  validations={[required]}
                />
              </div>
              
              <div className="form-group">
                <button className="btn btn-primary btn-block">ORDER</button>
              </div>

              <Link className="btn btn-outline-danger mx-2" to="/profile">
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
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default OrderPlace;
