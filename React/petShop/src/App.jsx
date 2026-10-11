import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import { products } from "./data/products.json";
import Header from "./components/Header";

function App() {
  const [view, setView] = useState("home");
  const [productId, setProductId] = useState(0);

  return (
    <>
      <Header view={view} setView={setView} />
      <main>
        {view === "home" && <Home setView={setView} />}
        {view === "products" && (
          <Products
            products={products}
            setProductId={setProductId}
            setView={setView}
          />
        )}
        {view === "productDetails" && (
          <ProductDetails
            products={products}
            setView={setView}
            productId={productId}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
