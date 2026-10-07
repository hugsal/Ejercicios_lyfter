requireAuth("./login.html");

function appendTableCell(row, value, className = "") {
  const cell = document.createElement("td");
  if (className) cell.className = className;
  cell.textContent = value ?? "-";
  row.appendChild(cell);
  return cell;
}

function renderTableMessage(tableBody, columnCount, message, isError = false) {
  const row = document.createElement("tr");
  const cell = appendTableCell(row, message);
  cell.colSpan = columnCount;
  cell.style.textAlign = "center";
  cell.style.padding = "1rem";
  if (isError) cell.style.color = "#e53e3e";
  tableBody.replaceChildren(row);
}

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

async function renderProductsTable() {
  try {
    const products = await getProducts();
    const tableBody = document.getElementById("products-table");
    if (!tableBody) return;
    tableBody.replaceChildren();
    products.forEach((product) => {
      const row = document.createElement("tr");
      appendTableCell(row, product.id, "cell-id");
      appendTableCell(row, product.name, "cell-name");
      appendTableCell(row, product.price);
      appendTableCell(row, product.stock);

      const actionsCell = appendTableCell(row, "", "cell-actions");
      const actionsGroup = document.createElement("div");
      actionsGroup.className = "actions-group";
      [
        ["btn-action-edit", "Editar"],
        ["btn-action-delete", "Eliminar"],
      ].forEach(([className, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = className;
        button.dataset.productId = product.id;
        button.textContent = label;
        actionsGroup.appendChild(button);
      });
      actionsCell.appendChild(actionsGroup);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al renderizar tabla de productos:", error);
    const tableBody = document.getElementById("products-table");
    const errorMessage =
      error.response?.data?.message ||
      "No se pudieron cargar los productos de la tienda.";
    if (tableBody) {
      renderTableMessage(tableBody, 5, errorMessage, true);
    }
    alert(errorMessage);
  }
}

checkAdmin();
renderProductsTable();
renderSalesTable();

async function renderSalesTable() {
  const tableBody = document.getElementById("sales-table");
  if (!tableBody) return;

  try {
    const sales = await getSales();
    tableBody.replaceChildren();

    if (!sales || sales.length === 0) {
      renderTableMessage(tableBody, 7, "No hay ventas registradas aún.");
      return;
    }

    sales.forEach((sale) => {
      const row = document.createElement("tr");
      appendTableCell(row, sale.id, "cell-id");
      appendTableCell(row, sale.user.name);
      appendTableCell(row, sale.user.email);
      appendTableCell(row, sale.billingAddress);
      appendTableCell(
        row,
        sale.totalAmount == null ? "-" : `$${sale.totalAmount}`,
      );
      appendTableCell(
        row,
        sale.purchaseDate
          ? new Date(sale.purchaseDate).toLocaleDateString()
          : "-",
      );
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al renderizar tabla de ventas:", error);
    const errorMessage =
      error.response?.data?.message || "No se pudieron cargar las ventas.";
    if (tableBody) {
      renderTableMessage(tableBody, 7, errorMessage, true);
    }
    alert(errorMessage);
  }
}

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-action-edit")) {
    const productId = event.target.dataset.productId;
    window.location.href = `./editProduct.html?id=${productId}`;
  }
  if (event.target.classList.contains("btn-action-delete")) {
    const productId = event.target.dataset.productId;
    try {
      await deleteProduct(productId);
      alert("Producto borrado exitosamente");
      location.reload();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert(
        error.response?.data?.message ||
          "No se pudo eliminar el producto. Inténtalo de nuevo.",
      );
    }
  }
  if (event.target.id === "log-out-btn") {
    logout();
  }
});

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("add-product-name");
  if (!nameInput) return;

  const name = nameInput.value;
  const description = document.getElementById("add-product-description").value;
  const price = Number(document.getElementById("add-product-price").value);
  const stock = Number(document.getElementById("add-product-stock").value);

  try {
    await createProduct({ name, description, price, stock });
    alert("Producto agregado correctamente");
    location.reload();
  } catch (error) {
    console.error("Error al crear producto:", error);
    alert(
      error.response?.data?.message ||
        "No se pudo agregar el producto. Por favor verifica los datos.",
    );
  }
});
