requireAuth("./unauthorized.html");

async function renderOrderSummary() {
  const params = new URLSearchParams(window.location.search);
  const cartId = params.get("cartId");
  const summaryTableBody = document.getElementById("summary-table-body");

  if (!cartId) {
    const errorMsg = "No se proporcionó un identificador de carrito válido.";
    if (summaryTableBody) {
      renderSummaryMessage(summaryTableBody, errorMsg);
    }
    alert(errorMsg);
    return;
  }

  try {
    const cart = await getCartById(cartId);
    if (summaryTableBody && cart.items) {
      summaryTableBody.replaceChildren();
      cart.items.forEach((item) => {
        const row = document.createElement("tr");
        [
          ["product-name", item.product.name],
          ["qty", item.quantity],
          ["unit-price", item.product.price],
          ["subtotal", item.subtotal],
        ].forEach(([className, value]) => {
          const cell = document.createElement("td");
          cell.className = className;
          cell.textContent = value ?? "-";
          row.appendChild(cell);
        });
        summaryTableBody.appendChild(row);
      });
    }
    const totalCart = document.getElementById("totalCart");
    if (totalCart) totalCart.textContent = cart.totalAmount;
  } catch (error) {
    console.error("Error al cargar resumen de orden:", error);
    const errorMessage =
      error.response?.data?.message ||
      "No se pudieron cargar los detalles de la orden realizada.";
    if (summaryTableBody) {
      renderSummaryMessage(summaryTableBody, errorMessage, true);
    }
    alert(errorMessage);
  }
}

function renderSummaryMessage(tableBody, message, isError = false) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 4;
  cell.style.textAlign = "center";
  cell.style.padding = "1rem";
  if (isError) cell.style.color = "#e53e3e";
  cell.textContent = message;
  row.appendChild(cell);
  tableBody.replaceChildren(row);
}

renderOrderSummary();

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "log-out-btn") {
    logout("./login.html");
  }
});
