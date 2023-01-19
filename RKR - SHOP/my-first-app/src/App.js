
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import EditUser from "./Components/EditProfile";
import CreateProduct from "./Product/CreateProduct";
import ListProducts from "./Product/ListProducts";
import EditProduct from "./Product/EditProduct";
import UserList from "./Components/UserList";
import UserProduct from "./Components/User-Product";
import OrderPlace from "./Order/PlaceOrder";
import OrderHistory from "./Order/OrderHistory";
import Sidebar from "./Layout/Sidebar";
import Navbar from "./Layout/Navbar";
import ActivityLog from "./Components/ActivityLog";
import ActivateHistory from "./Components/ActivateHistory";
import FileUpload from "./FileUpload/fileUpload";
import React from 'react'
import AllOrderHistory from "./Order/AllOrderHistory";

function App() {

  return (

    <div className="App">     
    
        <Navbar/>

          <Sidebar/>

      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/userList" element={<UserList />} />
          <Route exact path="/list" element={<ListProducts/>} />
          <Route path="/addProduct" element={<CreateProduct/>} />
          <Route exact path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/userProduct" element={<UserProduct/>} />
          <Route path="/placeOrder" element={<OrderPlace/>} />
          <Route path="/orderHistory" element={<OrderHistory/>} />
          <Route path="/allOrderHistory" element={<AllOrderHistory/>} />
          <Route path="/activityLog" element={<ActivityLog/>} />
          <Route exact path="/activateHistory/:id" element={<ActivateHistory />} />
          <Route path="/upload" element={<FileUpload/>} />
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
