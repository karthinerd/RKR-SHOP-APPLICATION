
import authHeader from "../Services/auth-header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import _ from "lodash";


export default function ListProducts() {
  
  const [product, setProduct] = useState([]);

  const [open, setOpen] = React.useState(false);

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


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8001/product/getProduct",{ headers: authHeader() });
    setProduct(result.data.dataObject);
    setPaginatedPosts(_(result.data.dataObject).slice(0).take(pageSize).value());
  };

  const deleteUser = async (id) => {
      await axios.delete(`http://localhost:8001/product/deleteProduct/${id}`,{ headers: authHeader() });
    loadProducts();
    setTimeout(window.location.reload(true), 10000);
    handleClose();
  };



  return (
    <div className="container">
      <div className="addPro">
        <Link to={"/addProduct"}>
        <button className="btn btn-outline-danger">
        <i class="fa-thin fa-plus"></i>
        Add Product
        </button>        
        </Link>
      </div>
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
            {paginatedPosts.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {/* {index + 1} */}
                    {user.id}
                </th>
                <td>{user.productName}</td>
                <td>{user.price}</td>
                <td>{user.availableQuantity}</td>
                <td>{user.productDescription}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editproduct/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-outline-secondary mx-2"
                    to={"/upload"}
                  >
                    Upload Image
                  </Link>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are You Sure ? You Want to Delete This Product ?"}
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
                    className="btn btn-danger mx-2"
                    onClick={handleClickOpen}
                  >
                    Delete
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
      </div>
    </div>
  );
}
