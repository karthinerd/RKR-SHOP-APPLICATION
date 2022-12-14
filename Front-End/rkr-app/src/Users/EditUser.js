import axios from "axios";
import React, { useState , useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    userName: "",
    passWord: "",
    confirmPassword: "",
    emailId: "",
    phoneNumber: "",
  });

  const { userName, passWord, confirmPassword, emailId, phoneNumber } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8001/user/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8001/getUser/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
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
                required
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
                required
              />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your Password"
                  name="passWord"
                  value={passWord}
                  onChange={(e) => onInputChange(e)}
                  required
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
                  required
                />
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
                  required
                />
              </div>
              
            <button type="submit" className="btn btn-outline-primary">
              Submit
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

