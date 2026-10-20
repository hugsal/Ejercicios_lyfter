import axiosInstance from "./config";

async function getProducts() {
  const { data } = await axiosInstance.get("/products");
  return data.products;
}

async function getProductById(id) {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data.product;
}

async function createProduct(productData) {
  const { data } = await axiosInstance.post("/products", productData);
  return data.product;
}

async function updateProduct(id, productData) {
  const { data } = await axiosInstance.put(`/products/${id}`, productData);
  return data.product;
}

async function deleteProduct(id) {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
}

async function getMe() {
  const { data } = await axiosInstance.get("/me");
  return data;
}

async function loginUser(email, password) {
  const { data } = await axiosInstance.post("/login", { email, password });
  return data;
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMe,
  loginUser,
};
