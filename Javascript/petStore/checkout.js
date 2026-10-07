requireAuth("./unauthorized.html");

let cartId = null;

async function renderCheckoutCart() {
  try {
    const cart = await getActiveCart();
    cartId = cart.id;
    const total = document.getElementById("totalCart");
    if (total) total.textContent = `₡${cart.totalAmount}`;
    const container = document.getElementById("cartContent");
    if (container && cart.items) {
      container.replaceChildren();
      cart.items.forEach((item) => {
        const article = document.createElement("div");
        article.classList.add("order-summary-item");
        const info = document.createElement("div");
        info.className = "order-item-info";
        const title = document.createElement("span");
        title.className = "order-item-title";
        title.textContent = item.product.name ?? "";
        const detail = document.createElement("span");
        detail.className = "order-item-detail";
        detail.textContent = `${item.quantity} x ${item.product.price}`;
        info.append(title, detail);

        const price = document.createElement("span");
        price.className = "order-item-price";
        price.textContent = item.subtotal;
        article.append(info, price);
        container.appendChild(article);
      });
    }
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.response?.data?.message ||
      "No se pudo cargar el resumen de la compra. Por favor intenta de nuevo.";
    const container = document.getElementById("cartContent");
    if (container) {
      const message = document.createElement("p");
      message.style.color = "#e53e3e";
      message.style.padding = "0.5rem 0";
      message.textContent = errorMessage;
      container.replaceChildren(message);
    }
    alert(errorMessage);
  }
}

renderCheckoutCart();

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "log-out-btn") {
    logout();
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  try {
    await createSale({
      fullName,
      email,
      billingAddress: address,
      paymentMethod: "SINPE",
      phone,
      cartId,
    });
    window.location.href = `./orderSuccess.html?cartId=${cartId}`;
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.response?.data?.message ||
      "No se pudo completar la compra. Por favor verifica los datos e inténtalo de nuevo.";
    alert(errorMessage);
  }
});
