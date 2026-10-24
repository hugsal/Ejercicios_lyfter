import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import PrivateRouter from "./components/PrivateRouter";
import PublicRouter from "./components/PublicRouter";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import Admin from "./screens/Admin";
import EditProduct from "./screens/EditProduct";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Checkout from "./screens/Checkout";
import Cart from "./screens/Cart";
import Contacto from "./screens/Contacto";
import { useAuth } from "./contexts/auth/useAuth";

function App() {
  const { isLogged, role, isLoadingAuth } = useAuth();

  useEffect(() => {
    isLogged();
  }, []);

  if (isLoadingAuth) return <Loading />;

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/" element={<Home />} />
          <Route element={<PublicRouter />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route path="/productos/:id" element={<ProductDetails />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            {role === "admin" && (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/editar/:id" element={<EditProduct />} />
              </>
            )}
          </Route>
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
