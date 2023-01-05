import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const {
    username,
    password,
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
    if (!values.username) {
      errors.userName = "UserName is Mandatory!";
    }else if (values.username.length<4) {
      errors.username = "UserName must be more than 3 characters!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.passWord.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login</h2>
          <form id="signUpForm" onSubmit={(e) => onSubmit(e)} autoComplete="off">
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                UserName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.password}</p>
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