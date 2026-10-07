requireAuth("./unauthorized.html");

async function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  try {
    const product = await getProductById(productId);
    if (product) {
      const imgEl = document.getElementById("detailImage");
      const titleEl = document.getElementById("detailTitle");
      const priceEl = document.getElementById("detailPrice");
      const categoryEl = document.getElementById("detailCategory");
      const stockEl = document.getElementById("detailStock");
      const descEl = document.getElementById("detailDescription");
      const btnCart = document.getElementById("btnAddToCart");

      if (imgEl) {
        imgEl.src = imgs[product.id - 1] || imgs[0];
      }
      if (titleEl && product.name) titleEl.textContent = product.name;
      if (priceEl && product.price) priceEl.textContent = `₡${product.price}`;
      if (categoryEl && product.category)
        categoryEl.textContent = product.category;

      const hasStock =
        product.stock !== undefined ? Number(product.stock) > 0 : true;
      if (stockEl) {
        if (product.stock !== undefined) {
          stockEl.textContent = hasStock
            ? `Stock disponible: ${product.stock} unidades`
            : "Producto Agotado (Sin stock)";
          stockEl.className = hasStock
            ? "product-detail-stock"
            : "product-detail-stock out-of-stock";
        } else {
          stockEl.textContent = "Stock disponible";
          stockEl.className = "product-detail-stock";
        }
      }

      if (btnCart && !hasStock) {
        btnCart.disabled = true;
        btnCart.textContent = "Agotado";
        btnCart.classList.add("disabled");
      }

      if (descEl && product.description)
        descEl.textContent = product.description;
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "No se pudieron cargar los detalles del producto desde la API.";
    alert(errorMessage);

    const imgEl = document.getElementById("detailImage");
    const titleEl = document.getElementById("detailTitle");
    const priceEl = document.getElementById("detailPrice");
    const categoryEl = document.getElementById("detailCategory");
    const descEl = document.getElementById("detailDescription");

    const idNum = parseInt(productId) || 1;
    const imageIndex = idNum > 0 ? idNum - 1 : 0;

    if (imgEl) imgEl.src = imgs[imageIndex] || imgs[0];
    if (titleEl && !titleEl.textContent)
      titleEl.textContent = `Producto #${idNum}`;
    if (priceEl && !priceEl.textContent) priceEl.textContent = "₡15 000";
    if (categoryEl && !categoryEl.textContent)
      categoryEl.textContent = "Mascotas";
    if (descEl && !descEl.textContent)
      descEl.textContent =
        "Excelente producto para tu mascota. Alta calidad y durabilidad garantizada.";
  }
}

document.addEventListener("DOMContentLoaded", loadProductDetail);

document.addEventListener("click", async (event) => {
  if (event.target && event.target.id === "btnAddToCart") {
    event.preventDefault();
    if (event.target.disabled) {
      alert("Este producto se encuentra agotado.");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id") || "1";
    try {
      await addToCart(productId, 1);
      alert(`Producto ${productId} agregado al carrito desde detalle`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo agregar el producto al carrito. Inténtalo de nuevo.";
      alert(errorMessage);
    }
  } else if (event.target && event.target.id === "btnBackCatalog") {
    event.preventDefault();
    window.location.href = "products.html";
  } else if (event.target && event.target.id === "log-out-btn") {
    logout();
  }
});
