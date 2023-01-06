import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Layout/NavBar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./Users/AddUser";
import EditUser from "./Users/EditUser";
import ViewUser from "./Users/ViewUser";
import Footer from "./Layout/Footer";
import Sidebar from "./Layout/Sidebar";
import Login from "./Pages/Login";
import AddProduct from "./Products/AddProduct";
import ListProducts from "./Products/ListProducts";
import ViewProduct from "./Products/ViewProduct";
import EditProduct from "./Products/EditProduct";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="side">
          <Sidebar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
        </div>

        <Routes>
          <Route exact path="/"/>
          <Route exact path="/productList" element={<Home />} />
          <Route exact path="/signup" element={<AddUser />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />

          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/productList" element={<ListProducts />} />
          <Route exact path="/editProduct/:id" element={<EditProduct />} />
          <Route exact path="/viewProduct/:id" element={<ViewProduct />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
