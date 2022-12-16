import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    passWord: "",
    emailId: "",
  });

  const {
    userName,
    passWord,
    emailId,
  } = user;

  const [formErrors, setFormErrors] = useState({});

  const onInputChange = (e) => { 
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    await axios.post("http://localhost:8002/login", user);
    navigate("/");
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.userName = "UserName is Mandatory!";
    }else if (values.userName.length<4) {
      errors.userName = "UserName must be more than 3 characters!";
    }
    if (!values.emailId) {
      errors.emailId = "Email is required!";
    } else if (!regex.test(values.emailId)) {
      errors.emailId = "This is not a valid email format!";
    }
    if (!values.passWord) {
      errors.passWord = "Password is required";
    } else if (values.passWord.length < 8) {
      errors.passWord = "Password must be more than 8 characters";
    } else if (values.passWord.length > 10) {
      errors.passWord = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };


  // const dis = () => {

  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registration</h2>
          <form id="signUpForm" onSubmit={(e) => onSubmit(e)} autoComplete="off">
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                UserName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="userName"
                value={userName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.userName}</p>
            
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="emailId"
                value={emailId}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.emailId}</p>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your Password"
                name="passWord"
                value={passWord}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.passWord}</p>

            <button type="submit" id="loginBtn"
             className="btn btn-outline-primary" 
             
             >
              Login
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}