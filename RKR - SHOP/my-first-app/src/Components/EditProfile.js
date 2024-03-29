import axios from "axios";
import React, { useState , useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authHeader from "../Services/auth-header";
import AuthService from "../Services/auth.service";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    points:""
  });

  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowAdminBoard(user.dataObject.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const {
    username,
    email,
    phoneNumber,
    points
  } = user;

  let resData = {
   "username" : username,
   "email" : email,
   "phoneNumber": phoneNumber,
   "points" :points
  }

  const [formErrors, setFormErrors] = useState({});

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    
    e.preventDefault();
    setFormErrors(validate(user));

    await axios.put(`http://localhost:8001/api/auth/update/${id}`, resData,{ headers: authHeader() });
    navigate("/login");
    setTimeout(window.location.reload(true), 10000);
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8001/api/auth/get/${id}`,{ headers: authHeader() });
    setUser(result.data.dataObject);
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
          <h2 className="text-center m-4">Edit Details</h2>
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

            {showAdminBoard && (
              <div>
            <div className="mb-3">
              <label htmlFor="points" className="form-label">
                Points
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
            </div>
            )}
            <button type="submit" id="loginBtn"
             className="btn btn-outline-primary" 
             >
              Update
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/profile">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
  }