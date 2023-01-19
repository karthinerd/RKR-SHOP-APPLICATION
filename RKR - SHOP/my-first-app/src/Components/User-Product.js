import authHeader from "../Services/auth-header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../Services/auth.service";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import _ from "lodash";

export default function UserProduct() {

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(window.location.reload(true), 10000);
  };

  const [product, setProduct] = useState([]);


  const [message, setMessage] = useState("");

  const user = AuthService.getCurrentUser();

  const pageSize = 10 ;

  const [paginatedPosts,setPaginatedPosts] = useState([]);

  const [currentPage , setCurrentPage] = useState(1);

  const pageCount = product? Math.ceil(product.length/pageSize):0;

  const pages = _.range(1,pageCount+1);

  const pagination = (pageno)=>{
    setCurrentPage(pageno);
    const startIntex = (pageno - 1) * pageSize;
    const paginatedPost = _(product).slice(startIntex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8001/product/getProduct", {
      headers: authHeader(),
    });
    setProduct(result.data.dataObject);
    setPaginatedPosts(_(result.data.dataObject).slice(0).take(pageSize).value());
  };

  const handleRegister = async (id) => {
    AuthService.order(id, user.dataObject.id).then(
      (response) => {
        setMessage(response.data.dataObject);
        setOpen(true);
      },
      (error) => {
        setMessage(error.response.data.dataObject);
        setOpen(true);
      }
    );
  };


  console.log(message);

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Product Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Available Quantity</th>
              <th>Product Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((pro, index) => (
              <tr>
                <th scope="row" key={index}>
                  {/* {index + 1} */}
                  {pro.id}
                </th>
                <td>{pro.productName}</td>
                <td>{pro.price}</td>
                <td>{pro.availableQuantity}</td>
                <td>{pro.productDescription}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleRegister(pro.id)}
                  >
                    Order
                  </button>
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

        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          {message}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
