import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import authHeader from "../Services/auth-header";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8001/api/auth/getAll", {
      headers: authHeader(),
    });
    setUsers(result.data.dataObject);
  };

  const deleteUser = async (id) => {
      await axios.delete(`http://localhost:8001/api/auth/delete/${id}`, {
        headers: authHeader(),
      });
    loadUsers();
    handleClose();
  };

  const activateUser = async (id) => {
    await axios.post(`http://localhost:8001/api/auth/activate/${id}`, {
      headers: authHeader(),
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={handleClickOpen}
                  ><i class="fa fa-trash"></i>
                    Delete
                  </button>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are You Sure ? You Want to Delete This User ?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">

                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => deleteUser(user.id)} autoFocus>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <button
                    className="btn btn-success"
                    onClick={() => activateUser(user.id)}
                  >
                    Activate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
