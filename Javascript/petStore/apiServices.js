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

async function getActiveCart() {
  const { data } = await axiosInstance.get("/carts/active");
  return data.cart;
}

async function getCartById(cartId) {
  const { data } = await axiosInstance.get(`/carts/${cartId}`);
  return data.cart;
}

async function addToCart(productId, quantity = 1) {
  const { data } = await axiosInstance.post("/carts/items", {
    productId,
    quantity,
  });
  return data;
}

async function updateCartItem(cartId, productId, quantity) {
  const { data } = await axiosInstance.put(`/carts/${cartId}/items`, {
    productId,
    quantity,
  });
  return data;
}

async function removeCartItem(productId) {
  const { data } = await axiosInstance.delete(`/carts/items/${productId}`);
  return data;
}

async function getMe(customToken = null) {
  const config = customToken
    ? { headers: { Authorization: `Bearer ${customToken}` } }
    : {};
  const { data } = await axiosInstance.get("/me", config);
  return data.user;
}

async function loginUser(userName, password) {
  const { data } = await axiosInstance.post("/login", { userName, password });
  return data;
}

async function registerUser(userData) {
  const { data } = await axiosInstance.post("/signin", userData);
  return data;
}

async function getSales() {
  const { data } = await axiosInstance.get("/invoices");
  return data.invoices;
}

async function createSale(saleData) {
  const { data } = await axiosInstance.post("/sales", saleData);
  return data;
}
