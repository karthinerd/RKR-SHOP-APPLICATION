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
import _ from "lodash";

export default function UserList() {

 const [disabled,setDisabled]=useState(false);

  async function getAccessToken() {
    return { Authorization: localStorage.getItem("Authorization")}
  }
  
  const [users, setUsers] = useState([]);

  const [open, setOpen] = React.useState(false);

  const pageSize = 10 ;

  const [paginatedPosts,setPaginatedPosts] = useState([]);

  const [currentPage , setCurrentPage] = useState(1);

  const pageCount = users? Math.ceil(users.length/pageSize):0;

  const pages = _.range(1,pageCount+1);

  const pagination = (pageno)=>{
    setCurrentPage(pageno);
    const startIntex = (pageno - 1) * pageSize;
    const paginatedPost = _(users).slice(startIntex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }

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
    setPaginatedPosts(_(result.data.dataObject).slice(0).take(pageSize).value());
  };

  const deleteUser = async (id) => {
      await axios.delete(`http://localhost:8001/api/auth/delete/${id}`, {
        headers: authHeader(),
      });
    loadUsers();
    handleClose();
  };

  const activateUser = async (id) => {
    setDisabled(true);
    await axios.get(`http://localhost:8001/api/auth/activateUser/${id}`, {
      headers: await getAccessToken(),
    }).then(
      (response) => {
            setDisabled(true);
      },
      (error) => {
         setDisabled(false);
      }
    );;
    loadUsers();
};


  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {user.id}
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
                  
                  <button
                  disabled={disabled}
                    className="btn btn-success"
                    onClick={() => activateUser(user.id)}
                  >
                    Activate
                  </button>
                  <Link
                    className="btn btn-outline-secondary mx-2"
                    to={`/activateHistory/${user.id}`}
                  >
                    Activity Log
                  </Link>

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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {
              pages.map((page)=>(
                <li className={
                  page === currentPage ? "page-item active" : "page-item"
                }>
                  <p className="page-link"
                  onClick={()=>pagination(page)}
                  >{page}</p>
                  </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}
