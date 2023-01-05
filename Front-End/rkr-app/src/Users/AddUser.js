import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
    points:""
  });

  const {
    username,
    password,
    email,
    phoneNumber,
    role,
    points
  } = user;

  const [formErrors, setFormErrors] = useState({});

  const onInputChange = (e) => { 
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    await axios.post("http://localhost:8001/api/auth/signup", user);
    navigate("/");
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "UserName is Mandatory";
    }else if (values.username.length<4) {
      errors.username = "UserName must be more than 3 characters";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 10) {
      errors.passWord = "Password cannot exceed more than 10 characters";
    }
    if (!values.role) {
      errors.role = "Role is Mandatory";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is Mandatory";
    }else if (values.phoneNumber.length < 10) {
      errors.phoneNumber = "PhoneNumber must be 10 characters";
    } else if (values.phoneNumber.length > 10) {
      errors.phoneNumber = "PhoneNumber cannot exceed more than 10 characters";
    }
    if (!values.points) {
      errors.points = "points Number is Mandatory";
    }else if (values.points.length < 0) {
      errors.points = "points must be more than 0 characters";
    return errors;
  };
  }
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
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
                
              />
            </div>
            <p>{formErrors.username}</p>
            
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.email}</p>

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
            
            <div className="mb-3">
              <label htmlFor="Role" className="form-label" />
              Select A Role
              <select
                className="form-select"
                aria-label="Default select example"
                name="role"
                value={role}
                onChange={(e) => onInputChange(e)}
            
              >
                <option hidden placeholder="Select Role"></option>
                <option name="role" value="admin">
                  admin
                </option>
                <option name="role" value="user">
                 user
                </option>
              </select>
            </div>
            <p>{formErrors.role}</p>

            <div className="mb-3">
              <label htmlFor="PhoneNumber" className="form-label">
                PhoneNumber
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter your phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.phoneNumber}</p>

            <div className="mb-3">
              <label htmlFor="points" className="form-label">
                points
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter your phoneNumber"
                name="points"
                value={points}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p>{formErrors.points}</p>

            <button type="submit" id="loginBtn"
             className="btn btn-outline-primary" 
             >
              Signup
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
