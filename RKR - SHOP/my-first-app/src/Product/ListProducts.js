
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

export default function ListProducts() {
  const [product, setProduct] = useState([]);

  const [open, setOpen] = React.useState(false);

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
  };

  const deleteUser = async (id) => {
      await axios.delete(`http://localhost:8001/product/deleteProduct/${id}`,{ headers: authHeader() });
    loadProducts();
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
              <th scope="col">S.N</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Available Quantity</th>
              <th>Product Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
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
      </div>
    </div>
  );
}
