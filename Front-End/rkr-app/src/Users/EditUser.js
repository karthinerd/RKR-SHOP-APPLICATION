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

    await axios.put(`http://localhost:8001/user/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8001/getUser/${id}`);
    setUser(result.data);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.userName = "UserName is Mandatory";
    }else if (values.userName.length<4) {
      errors.userName = "UserName must be more than 3 characters";
    }
    if (!values.emailId) {
      errors.emailId = "Email is required";
    } else if (!regex.test(values.emailId)) {
      errors.emailId = "This is not a valid email format";
    }
    if (!values.passWord) {
      errors.passWord = "Password is required";
    } else if (values.passWord.length < 8) {
      errors.passWord = "Password must be more than 8 characters";
    } else if (values.passWord.length > 10) {
      errors.passWord = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword.length < 8) {
      errors.confirmPassword = "Password must be more than 8 characters";
    } else if (values.confirmPassword.length > 10) {
      errors.confirmPassword = "Password cannot exceed more than 10 characters";
    }
    if(values.passWord!==values.confirmPassword){
      errors.confirmPassword="Password Doesn't Matched";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is Mandatory";
    }else if (values.phoneNumber.length < 10) {
      errors.phoneNumber = "PhoneNumber must be 10 Numbers";
    } else if (values.phoneNumber.length > 10) {
      errors.phoneNumber = "PhoneNumber cannot exceed more than 10 Numbers";
    }
    return errors;
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
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your Password"
                  name="passWord"
                  value={passWord}
                  onChange={(e) => onInputChange(e)}
                  
                />
              </div>
              <p>{formErrors.passWord}</p>

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
              <p>{formErrors.confirmPassword}</p>
            


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

