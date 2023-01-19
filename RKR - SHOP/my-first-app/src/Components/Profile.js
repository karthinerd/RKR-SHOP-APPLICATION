import React from "react";
import AuthService from "../Services/auth.service";
import { Link} from "react-router-dom";

const Profile = () => {

 const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.dataObject.username}</strong> Profile
        </h3>
      </header>
      <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>1</td>
                <td>{currentUser.dataObject.username}</td>
                <td>{currentUser.dataObject.email}</td>
                <td>{currentUser.dataObject.roles}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${currentUser.dataObject.id}`}
                  >
                    Edit
                </Link>
                <Link
                    className="btn btn-outline-secondary mx-2"
                    to={`/activateHistory/${currentUser.dataObject.id}`}
                  >
                    Activity Log
                  </Link>
                </td>
              </tr>
          </tbody>
        </table>
    </div>
  );
};

export default Profile;
