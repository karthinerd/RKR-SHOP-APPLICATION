import axios from "axios";
import authHeader from "../Services/auth-header";


const API_URL = "http://localhost:8001/api/auth/";

const PRODUCT_URL = "http://localhost:8001/product/";

const ORDER_URL = "http://localhost:8001/product/order/";

async function getAccessToken() {
  return { Authorization: localStorage.getItem("Authorization")}
}

const register = (username,email,password,phoneNumber,role) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    phoneNumber,
    role,
  });
};

const createProduct = async(productName,availableQuantity,price,productDescription) => {

  return axios.post(PRODUCT_URL + "addProduct", {
    productName,availableQuantity,price,productDescription
  },{headers: 
    await getAccessToken(), });
};


const order = (productId,userId) => {
   return axios.post(ORDER_URL + "placeOrder" ,{
    productId,
    userId,
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
