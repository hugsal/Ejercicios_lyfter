try {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "./login.html";
  }
} catch (error) {
  alert(error.message);
}

const accessToken = localStorage.getItem("access_token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

async function isAdmin() {
  try {
    const { data } = await axiosInstance.get("/me");
    if (data.user.role !== "admin") {
      window.location.href = "./products.html";
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getProducts() {
  try {
    const {
      data: { products },
    } = await axiosInstance.get("/products");
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="cell-id">${product.id}</td>
        <td class="cell-name">${product.name}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td class="cell-actions">
          <div class="actions-group">
            <button type="button" class="btn-action-edit" id="edit-btn-${product.id}">Editar</button>
            <button type="button" class="btn-action-delete" id="delete-btn-${product.id}">Eliminar</button>
          </div>
        </td>
      `;
      document.getElementById("products-table").appendChild(row);
    });
  } catch (error) {
    console.log(error.message);
  }
}

isAdmin();
getProducts();

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-action-edit")) {
    const productId = event.target.id.split("-")[2];
    window.location.href = `./editProduct.html?id=${productId}`;
  }
  if (event.target.classList.contains("btn-action-delete")) {
    const productId = e.target.id.split("-")[2];
    try {
      await axiosInstance.delete(`/products/${productId}`);
      alert("Producto borrado exitosamente");
      location.reload(true);
    } catch (error) {
      console.log(error.message);
    }
  }
  if (event.target.id === "log-out-btn") {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "./index.html";
  }
});

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("add-product-name").value;
  const description = document.getElementById("add-product-description").value;
  const price = Number(document.getElementById("add-product-price").value);
  const stock = Number(document.getElementById("add-product-stock").value);
  try {
    const {
      data: { product },
    } = await axiosInstance.post("/products", {
      name,
      description,
      price,
      stock,
    });
    alert("Producto agregado correctamente");
    location.reload(true);
  } catch (error) {
    console.log(error.message);
  }
});
