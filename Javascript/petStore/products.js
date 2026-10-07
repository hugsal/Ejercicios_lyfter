requireAuth("./unauthorized.html");

const container = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");

async function checkAdminStatus() {
  try {
    const user = await getMe();
    if (user && user.role === "admin") {
      const adminLink = document.getElementById("adminLink");
      if (adminLink) adminLink.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error al verificar estado de administrador:", error);
  }
}

async function renderProducts() {
  try {
    const productsList = await getProducts();

    if (!productsList || productsList.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      if (container) container.classList.add("hidden");
    } else {
      if (container) {
        container.removeAttribute("hidden");
        container.classList.remove("hidden");
        container.replaceChildren();
      }

      productsList.forEach((product, index) => {
        const card = document.createElement("article");
        card.className = "product-card";
        const hasStock =
          product.stock !== undefined ? Number(product.stock) > 0 : true;
        const stockText =
          product.stock !== undefined
            ? hasStock
              ? `Stock: ${product.stock}`
              : "Agotado"
            : "Stock: Disponible";
        const stockClass = hasStock
          ? "product-stock"
          : "product-stock out-of-stock";

        const image = document.createElement("img");
        image.src = product.image || imgs[product.id - 1] || imgs[0];
        image.alt = product.name ?? "Producto";
        image.className = "product-image";

        const info = document.createElement("div");
        info.className = "product-info";

        const title = document.createElement("h3");
        title.className = "product-title";
        title.textContent = product.name ?? "";

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = `₡${product.price}`;

        const stock = document.createElement("div");
        stock.className = stockClass;
        stock.textContent = stockText;

        const cartButton = document.createElement("button");
        cartButton.type = "button";
        cartButton.className = `btn-cart ${hasStock ? "" : "disabled"}`;
        cartButton.dataset.productId = product.id;
        cartButton.disabled = !hasStock;
        cartButton.textContent = hasStock ? "Agregar al carrito" : "Agotado";

        const detailsLink = document.createElement("a");
        detailsLink.href = `productDetail.html?id=${encodeURIComponent(String(product.id))}`;
        detailsLink.className = "btn-card";
        detailsLink.dataset.productId = product.id;
        detailsLink.textContent = "Ver detalles";

        info.append(title, price, stock, cartButton, detailsLink);
        card.append(image, info);
        container.appendChild(card);
      });
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "No se pudieron cargar los productos. Por favor intenta más tarde.";
    if (container) {
      container.removeAttribute("hidden");
      container.classList.remove("hidden");
      const message = document.createElement("p");
      message.style.color = "#e53e3e";
      message.style.textAlign = "center";
      message.style.gridColumn = "1 / -1";
      message.style.fontWeight = "500";
      message.textContent = errorMessage;
      container.replaceChildren(message);
    }
    alert(errorMessage);
  }
}

checkAdminStatus();
renderProducts();

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-card")) {
    event.preventDefault();
    const productId = event.target.dataset.productId;
    window.location.href = `./productDetail.html?id=${productId}`;
  } else if (event.target.classList.contains("btn-cart")) {
    event.preventDefault();
    if (event.target.disabled) {
      alert("Este producto se encuentra agotado.");
      return;
    }
    const productId = event.target.dataset.productId;
    try {
      await addToCart(productId, 1);
      alert(`Producto ${productId} agregado al carrito`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo agregar el producto al carrito. Inténtalo de nuevo.";
      alert(errorMessage);
    }
  }

  if (event.target.id === "log-out-btn") {
    logout();
  }
});
