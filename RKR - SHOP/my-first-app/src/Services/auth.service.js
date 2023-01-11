import axios from "axios";
import authHeader from "../Services/auth-header";

const API_URL = "http://localhost:8001/api/auth/";

const PRODUCT_URL = "http://localhost:8001/product/";

const ORDER_URL = "http://localhost:8001/product/order/";

const register = (username,email,password,phoneNumber,points,role) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    phoneNumber,
    points,
    role,
  });
};

const createProduct = (productName,productDescription,availableQuantity,productImage,price) => {
return axios.post(PRODUCT_URL + "addProduct",{
  productName,
  productDescription,
  availableQuantity,
  productImage,
  price
},{ headers: authHeader() })
}

const order = (productId,quantity,customerEmail,customerName) => {
   return axios.post(ORDER_URL + "placeOrder" ,{
    "cartItems": [
      {
          productId,
          quantity
      }
  ],
    customerEmail,
    customerName
   },{ headers: authHeader() })
}

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.dataObject.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  order,
  register,
  login,
  logout,
  createProduct,
  getCurrentUser,
};

export default AuthService;
