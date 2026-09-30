try {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "./unauthorized.html";
  }
} catch (error) {
  alert(error.message);
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

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

async function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get("id");

  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axiosInstance.get(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data.product);
    if (data && data.product) {
      const p = data.product;
      const imgEl = document.getElementById("detailImage");
      const titleEl = document.getElementById("detailTitle");
      const priceEl = document.getElementById("detailPrice");
      const categoryEl = document.getElementById("detailCategory");
      const descEl = document.getElementById("detailDescription");

      if (imgEl) {
        const imageIndex = p.id && p.id > 0 ? p.id - 1 : 0;
        imgEl.src = p.image || imgs[imageIndex] || imgs[0];
      }
      if (titleEl && p.name) titleEl.textContent = p.name;
      if (priceEl && p.price) priceEl.textContent = `₡${p.price}`;
      if (categoryEl && p.category) categoryEl.textContent = p.category;
      if (descEl && p.description) descEl.textContent = p.description;
    }
  } catch (error) {
    console.log("Cargando vista previa estática de producto:", error.message);
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

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "btnAddToCart") {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id") || "1";
    console.log(`Producto ${productId} agregado al carrito desde detalle`);
  } else if (event.target && event.target.id === "btnBackCatalog") {
    event.preventDefault();
    window.location.href = "products.html";
  }
});
