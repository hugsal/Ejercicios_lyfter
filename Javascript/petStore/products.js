const imgs = [
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544568100-847a948585b9?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588943211146-06514f29e12a?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581888227599-779811939961?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537151625745-76a13b7d359c?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516139008210-96e45dcca83b?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop",
];

try {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "./unauthorized.html";
  }
} catch (error) {
  alert(error.message);
}

const container = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");
const access_token = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
});

async function isAdmin() {
  try {
    const {
      data: { user },
    } = await axiosInstance.get("/me");
    if (user.role === "admin") {
      const adminLink = document.getElementById("adminLink");
      adminLink.classList.remove("hidden");
    }
  } catch (error) {
    alert(error.message);
  }
}

isAdmin();

async function products() {
  try {
    const { data } = await axiosInstance.get("/products");

    if (data.products.length === 0) {
      emptyState.classList.remove("hidden");
      container.classList.add("hidden");
    } else {
      container.removeAttribute("hidden");
      container.classList.remove("hidden");
    }

    data.products.forEach((product, index) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image || imgs[index] || imgs[0]}" alt="${product.name}" class="product-image" />
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">₡${product.price}</div>
          <button type="button" class="btn-cart" id="add-cart-${product.id}">Agregar al carrito</button>
          <a href="productDetail.html?id=${product.id}" class="btn-card" id="btn-${product.id}">Ver detalles</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.log(error);
    container.removeAttribute("hidden");
    container.classList.remove("hidden");
  }
}

products();

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-card")) {
    event.preventDefault();
    const productId = event.target.id.replace("btn-", "");
    console.log(productId);
    window.location.href = `./productDetail.html?id=${productId}`;
  } else if (event.target.classList.contains("btn-cart")) {
    event.preventDefault();
    const productId = event.target.id.replace("add-cart-", "");
    const { data } = await axiosInstance.post(`/carts/items`, {
      productId,
      quantity: 1,
    });
    console.log(data);
    alert(`Producto ${productId} agregado al carrito`);
  }

  if (event.target.id === "log-out-btn") {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "./index.html";
  }
});
