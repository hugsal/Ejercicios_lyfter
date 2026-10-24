import { createContext, useState, useEffect, useCallback } from "react";
import apiServices from "../../api/apiServices";
import { useAuth } from "../auth/useAuth";

export const CartContext = createContext({
  cart: null,
  cartItemsCount: 0,
  loadingCart: false,
  setCartData: (cart) => {},
  fetchActiveCart: async () => {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);
  const { isLoggedIn } = useAuth();

  const setCartData = useCallback((newCart) => {
    setCart(newCart);
    setCartItemsCount(newCart.items.length);
  }, []);

  const fetchActiveCart = useCallback(async () => {
    try {
      setLoadingCart(true);
      const data = await apiServices.getActiveCart();
      if (data) {
        setCartData(data);
      } else {
        setCart(null);
        setCartItemsCount(0);
      }
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      setCart(null);
      setCartItemsCount(0);
    } finally {
      setLoadingCart(false);
    }
  }, [setCartData]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchActiveCart();
    } else {
      setCart(null);
      setCartItemsCount(0);
    }
  }, [isLoggedIn, fetchActiveCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemsCount,
        loadingCart,
        setCartData,
        fetchActiveCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
