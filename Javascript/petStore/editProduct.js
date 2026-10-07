requireAuth("./login.html");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function checkAdmin() {
  try {
    const user = await getMe();
    if (!user || user.role !== "admin") {
      alert("No tienes permisos de administrador para acceder a esta página.");
      window.location.href = "./products.html";
    }
  } catch (error) {
    console.error("Error en verificación de admin:", error);
    alert(
      error.response?.data?.message ||
        "Error al verificar credenciales de administrador.",
    );
    window.location.href = "./products.html";
  }
}

async function fillData(id) {
  try {
    const product = await getProductById(id);
    if (product) {
      const nameEl = document.getElementById("editProductName");
      const descriptionEl = document.getElementById("editProductDescription");
      const priceEl = document.getElementById("editProductPrice");
      const categoryEl = document.getElementById("editProductCategory");
      const imageEl = document.getElementById("editProductImage");
      const stockEl = document.getElementById("editProductStock");

      if (nameEl) nameEl.value = product.name;
      if (descriptionEl) descriptionEl.value = product.description;
      if (priceEl) priceEl.value = product.price;
      if (categoryEl) categoryEl.value = product.category;
      if (imageEl) imageEl.value = product.image;
      if (stockEl) stockEl.value = product.stock;
    }
  } catch (error) {
    console.error("Error al cargar producto para edición:", error);
    const errorMessage =
      error.response?.data?.message ||
      "No se pudieron cargar los datos del producto.";
    alert(errorMessage);
  }
}

checkAdmin();
fillData(productId);

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "log-out-btn") {
    logout();
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("editProductName").value;
  const description = document.getElementById("editProductDescription").value;
  const price = Number(document.getElementById("editProductPrice").value);
  const stock = Number(document.getElementById("editProductStock").value);

  try {
    await updateProduct(productId, { name, description, price, stock });
    alert("Producto editado correctamente");
    window.location.href = "./admin.html";
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    alert(
      error.response?.data?.message ||
        "No se pudo guardar la edición del producto. Inténtalo de nuevo.",
    );
  }
});
