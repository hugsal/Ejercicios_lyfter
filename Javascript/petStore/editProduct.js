try {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "./login.html";
  }
} catch (error) {
  alert(error.message);
}

const accessToken = localStorage.getItem("access_token");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
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

async function fillData(id) {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`);
    console.log(data);
    if (data && data.product) {
      const p = data.product;
      const nameEl = document.getElementById("editProductName");
      const descriptionEl = document.getElementById("editProductDescription");
      const priceEl = document.getElementById("editProductPrice");
      const categoryEl = document.getElementById("editProductCategory");
      const imageEl = document.getElementById("editProductImage");
      const stockEl = document.getElementById("editProductStock");

      if (nameEl) nameEl.value = p.name;
      if (descriptionEl) descriptionEl.value = p.description;
      if (priceEl) priceEl.value = p.price;
      if (categoryEl) categoryEl.value = p.category;
      if (imageEl) imageEl.value = p.image;
      if (stockEl) stockEl.value = p.stock;
    }
  } catch (error) {
    console.log(error.message);
  }
}

isAdmin();
fillData(productId);

document.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("editProductName").value;
  const description = document.getElementById("editProductDescription").value;
  const price = Number(document.getElementById("editProductPrice").value);
  const stock = Number(document.getElementById("editProductStock").value);

  try {
    const { data } = await axiosInstance.put(`/products/${productId}`, {
      name,
      description,
      price,
      stock,
    });
    alert("Producto editado correctamente");
    window.location.href = "./admin.html";
  } catch (error) {
    console.log(error.message);
  }
});
