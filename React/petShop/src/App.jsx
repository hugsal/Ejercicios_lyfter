import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import Admin from "./screens/Admin";
import EditProduct from "./screens/EditProduct";
import { useProductsStore } from "./store/productsStore";
import Home from "./screens/Home";
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
