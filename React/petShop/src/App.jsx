import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./screens/home";
import Products from "./screens/products";
import ProductDetails from "./screens/productDetails";

function App() {
  const [view, setView] = useState("home");
  const [productId, setProductId] = useState(0);

  return (
    <>
      <Header setView={setView} />
      <main>
        {view === "home" && <Home setView={setView} />}
        {view === "products" && (
          <Products setProductId={setProductId} setView={setView} />
        )}
        {view === "productDetails" && (
          <ProductDetails setView={setView} productId={productId} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
