import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./screens/home";
import Products from "./screens/products";
import ProductDetails from "./screens/productDetails";
import Admin from "./screens/admin";
import EditProduct from "./screens/editProduct";
import { useProductsStore } from "./store/productsStore";
import { products } from "./data/products.json";

function App() {
  const [view, setView] = useState("home");
  const [productId, setProductId] = useState(0);
  const { setProducts } = useProductsStore();

  useEffect(() => {
    setProducts(products);
  }, []);

  return (
    <>
      <Header view={view} setView={setView} />
      <main>
        {view === "home" && <Home setView={setView} />}
        {view === "products" && (
          <Products setProductId={setProductId} setView={setView} />
        )}
        {view === "productDetails" && (
          <ProductDetails setView={setView} productId={productId} />
        )}
        {view === "administration" && (
          <Admin setView={setView} setProductId={setProductId} />
        )}
        {view === "editProduct" && (
          <EditProduct setView={setView} productId={productId} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
