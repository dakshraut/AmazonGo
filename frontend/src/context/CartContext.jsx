import { createContext, useState } from "react";
import cartService from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const data = await cartService.getCart();
    setCart(data);
  };

  const addToCart = async (item) => {
    await cartService.add(item);
    loadCart();
  };

  const removeFromCart = async (id) => {
    await cartService.remove(id);
    loadCart();
  };

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};