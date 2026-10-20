import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLoginStore } from "./store/loginStore";
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

function App() {
  const isLoadingAuth = useLoginStore((state) => state.isLoadingAuth);
  const isLogged = useLoginStore((state) => state.isLogged);
  const role = useLoginStore((state) => state.role);

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
          <Route element={<PublicRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route path="/productos/:id" element={<ProductDetails />} />
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
