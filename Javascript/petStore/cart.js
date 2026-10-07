requireAuth("./unauthorized.html");

const emptyState = document.getElementById("cartEmptyState");
const container = document.getElementById("cartContent");
const list = document.getElementById("cartItemsList");
const totalCart = document.getElementById("totalCart");

async function renderCart() {
  try {
    const cart = await getActiveCart();
    if (!cart || !cart.items || cart.items.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      if (container) container.classList.add("hidden");
    } else {
      cartId = cart.id;
      if (totalCart) totalCart.innerText = `₡${cart.totalAmount}`;
      if (list) {
        list.replaceChildren();
        cart.items.forEach((item) => {
          const article = document.createElement("article");
          article.classList.add("cart-item");
          const imageSrc =
            item.product.image || imgs[item.product.id - 1] || imgs[0];
          const image = document.createElement("img");
          image.src = imageSrc;
          image.alt = item.product.name ?? "Producto";
          image.className = "cart-item-img";

          const details = document.createElement("div");
          details.className = "cart-item-details";
          const title = document.createElement("h3");
          title.className = "cart-item-title";
          title.textContent = item.product.name ?? "";
          details.appendChild(title);

          const quantityControl = document.createElement("div");
          quantityControl.className = "cart-qty-control";
          const decreaseButton = document.createElement("button");
          decreaseButton.className = "btn-qty";
          decreaseButton.setAttribute("aria-label", "Disminuir cantidad");
          decreaseButton.id = `btn-qty-decrease-${item.id}`;
          decreaseButton.textContent = "-";
          const quantity = document.createElement("div");
          quantity.className = "qty-box";
          quantity.id = `qty-box-${item.id}`;
          quantity.textContent = item.quantity;
          const increaseButton = document.createElement("button");
          increaseButton.className = "btn-qty";
          increaseButton.setAttribute("aria-label", "Aumentar cantidad");
          increaseButton.id = `btn-qty-increase-${item.id}`;
          increaseButton.textContent = "+";
          quantityControl.append(decreaseButton, quantity, increaseButton);

          const prices = document.createElement("div");
          prices.className = "cart-item-prices";
          const unitPrice = document.createElement("span");
          unitPrice.className = "price-unit";
          unitPrice.textContent = `Precio: ${item.unitPrice}`;
          const subtotal = document.createElement("span");
          subtotal.className = "price-subtotal";
          subtotal.append("Subtotal: ");
          const subtotalAmount = document.createElement("strong");
          subtotalAmount.textContent = item.subtotal;
          subtotal.appendChild(subtotalAmount);
          const removeButton = document.createElement("button");
          removeButton.className = "btn-remove";
          removeButton.id = `btn-remove-${item.product.id}`;
          const removeIcon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg",
          );
          removeIcon.setAttribute("width", "14");
          removeIcon.setAttribute("height", "14");
          removeIcon.setAttribute("viewBox", "0 0 24 24");
          removeIcon.setAttribute("fill", "none");
          removeIcon.setAttribute("stroke", "currentColor");
          removeIcon.setAttribute("stroke-width", "2");
          removeIcon.setAttribute("stroke-linecap", "round");
          removeIcon.setAttribute("stroke-linejoin", "round");
          const removeIconTop = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline",
          );
          removeIconTop.setAttribute("points", "3 6 5 6 21 6");
          const removeIconBody = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          removeIconBody.setAttribute(
            "d",
            "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
          );
          removeIcon.append(removeIconTop, removeIconBody);
          removeButton.append(removeIcon, document.createTextNode("Eliminar"));
          prices.append(unitPrice, subtotal, removeButton);

          article.append(image, details, quantityControl, prices);
          list.appendChild(article);
        });
      }
    }
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.response?.data?.message ||
      "No se pudo cargar la información del carrito. Inténtalo de nuevo más tarde.";
    if (list) {
      const message = document.createElement("p");
      message.style.color = "#e53e3e";
      message.style.padding = "1rem";
      message.textContent = errorMessage;
      list.replaceChildren(message);
    } else {
      alert(errorMessage);
    }
  }
}

let cartId = null;
renderCart();

document.addEventListener("click", async (event) => {
  const id = event.target.id || "";
  const targetBtn = event.target.closest(".btn-remove");
  const removeId = targetBtn ? targetBtn.id : id;

  if (removeId.startsWith("btn-remove-")) {
    const btnRemoveId = removeId.split("-")[2];
    try {
      await removeCartItem(btnRemoveId);
      location.reload();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo eliminar el producto del carrito.";
      alert(errorMessage);
    }
  }

  if (id.startsWith("btn-qty-increase-")) {
    const btnQtyIncreaseId = id.split("-")[3];
    const qtyBox = document.getElementById(`qty-box-${btnQtyIncreaseId}`);
    if (qtyBox) {
      qtyBox.innerText = Number(qtyBox.innerText) + 1;
      await updateCartItem(cartId, btnQtyIncreaseId, Number(qtyBox.innerText));
      location.reload();
    }
  }

  if (id.startsWith("btn-qty-decrease-")) {
    const btnQtyDecreaseId = id.split("-")[3];
    const qtyBox = document.getElementById(`qty-box-${btnQtyDecreaseId}`);
    if (qtyBox && Number(qtyBox.innerText) > 1) {
      qtyBox.innerText = Number(qtyBox.innerText) - 1;
      await updateCartItem(cartId, btnQtyDecreaseId, Number(qtyBox.innerText));
      location.reload();
    }
  }

  if (id.startsWith("log-out-btn")) {
    logout();
  }

  if (id.startsWith("checkout-btn")) {
    window.location.href = "./checkout.html";
  }
});
