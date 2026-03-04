import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import cartService from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useAuth();

  const loadCart = async () => {
    if (token && user) {
      try {
        const data = await cartService.getCart();
        setCart(data);
      } catch (error) {
        console.error("Failed to load cart:", error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user, token]);

  const addToCart = async (item) => {
    try {
      await cartService.add(item);
      await loadCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (id) => {
    try {
      await cartService.remove(id);
      await loadCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};