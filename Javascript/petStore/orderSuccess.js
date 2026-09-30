try {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "./unauthorized.html";
  }
} catch (error) {
  alert(error.message);
}

const access_token = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
});

async function getCart() {
  const params = new URLSearchParams(window.location.search);
  const cartId = params.get("cartId");
  const { data } = await axiosInstance.get(`/carts/${cartId}`);
  const summaryTableBody = document.getElementById("summary-table-body");
  data.cart.items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="product-name">${item.product.name}</td>
      <td class="qty">${item.quantity}</td>
      <td class="unit-price">${item.product.price}</td>
      <td class="subtotal">${item.subtotal}</td>
    `;
    summaryTableBody.appendChild(row);
  });
  const totalCart = document.getElementById("totalCart");
  totalCart.textContent = data.cart.totalAmount;
}

getCart();

const logoutBtn = document.getElementById("log-out-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "./login.html";
});
