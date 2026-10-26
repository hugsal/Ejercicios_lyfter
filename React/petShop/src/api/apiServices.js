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

async function addToCart(productId, quantity = 1) {
  const { data } = await axiosInstance.post("/carts/items", {
    productId,
    quantity,
  });
  return data;
}

async function getActiveCart() {
  const { data } = await axiosInstance.get("/carts/active");
  return data.cart;
}

async function createSale(saleData) {
  const { data } = await axiosInstance.post("/sales", saleData);
  return data;
}

async function updateItemCart(productId, quantity = 1) {
  const { data } = await axiosInstance.put(`/carts/items`, {
    productId,
    quantity,
  });
  return data;
}

async function deleteItemCart(productId) {
  const { data } = await axiosInstance.delete(`/carts/items/${productId}`);
  return data;
}

export default {
  addToCart,
  createSale,
  deleteItemCart,
  getProducts,
  getProductById,
  getActiveCart,
  createProduct,
  updateProduct,
  updateItemCart,
  deleteProduct,
  getMe,
  loginUser,
};
