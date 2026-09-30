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
  try {
    const {
      data: { cart },
    } = await axiosInstance.get("/carts/active");
    cartId = cart.id;
    const total = document.getElementById("totalCart");
    total.textContent = `₡${cart.totalAmount}`;
    const container = document.getElementById("cartContent");
    cart.items.forEach((item) => {
      const article = document.createElement("div");
      article.classList.add("order-summary-item");
      article.innerHTML = `
              <div class="order-item-info">
                <span class="order-item-title">${item.product.name}</span>
                <span class="order-item-detail">${item.quantity} x ${item.product.price}</span>
              </div>
              <span class="order-item-price">${item.subtotal}</span>
    `;
      container.appendChild(article);
    });
  } catch (error) {
    console.log(error);
  }
}
let cartId = null;
getCart();
const logoutBtn = document.getElementById("log-out-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "./index.html";
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  try {
    const { data } = await axiosInstance.post("/sales", {
      fullName,
      email,
      billingAddress: address,
      paymentMethod: "SINPE",
      phone,
      cartId,
    });
    window.location.href = `./orderSuccess.html?cartId=${cartId}`;
  } catch (error) {
    console.log(error);
  }
});
