import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8001/product/";

const getProduct = () => {
  return axios.get(API_URL + "getProduct");
};

const CreateProduct = () => {
  return axios.post(API_URL + "addProduct", { headers: authHeader() });
};


const ProductService = {
    getProduct,
    CreateProduct,
};

export default ProductService;