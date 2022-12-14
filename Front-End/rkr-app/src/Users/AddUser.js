import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    passWord: "",
    confirmPassword: "",
    emailId: "",
    phoneNumber: "",
    roleName: "",
  });

  const {
    userName,
    passWord,
    confirmPassword,
    emailId,
    phoneNumber,
    roleName,
  } = user;


  const onInputChange = (e) => {
    setUser({ ...user, ...roleName, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8001/register", user, roleName);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registration</h2>

          <form onSubmit={(e) => onSubmit(e)} autoComplete="off">
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
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"email"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="emailId"
                value={emailId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

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

            <div className="mb-3">
              <label htmlFor="ConfirmPassword" className="form-label">
                ConfirmPassword
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Re-Enter your Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Role" className="form-label" />
              Select A Role
              <select
                className="form-select"
                aria-label="Default select example"
                name="roleName"
                value={roleName}
                onChange={(e) => onInputChange(e)}
              >
                <option hidden placeholder="Select Role"></option>
                <option name="roleName" value="ADMIN">
                  Admin
                </option>
                <option name="roleName" value="USER">
                  User
                </option>
              </select>
            </div>

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

            <button type="submit" className="btn btn-outline-primary">
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
