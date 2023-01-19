import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vphoneNumber = (value) => {
  if (value.length < 7 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The phoneNumber must be between 7 and 10 Numbers.
      </div>
    );
  }
};


const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };


  const onChangeRole = (e) => {
    let role = e.target.value;
    setRole(role.split(","));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password,phoneNumber,role).then(
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
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
                  <i class="bi bi-eye-slash" 
                    id="togglePassword"></i>
              </div>

              <div className="form-group">
                <label htmlFor="password">PhoneNumber</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  validations={[required, vphoneNumber]}
                />
              </div>

              <div className="form-group" id="select">
              <label htmlFor="Role" className="form-label">
              Select A Role
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="role"
                value={role}
                onChange={onChangeRole}
                validations={[required]}
                style={{width: "270px"}}
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
              

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                <i class="fa-thin fa-user"></i>
                  Sign Up</button>
              </div>
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
              <Link className="btn btn-outline-info" to="/login">
               Go to Login
              </Link>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
