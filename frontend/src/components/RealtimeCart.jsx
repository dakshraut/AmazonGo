import React from "react";
import { useCart } from "../hooks/useCart";

const RealtimeCart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="realtime-cart">
      <h3>Live Cart</h3>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <span>{item.name}</span>
          <span>₹{item.price}</span>
          <button onClick={() => removeFromCart(item._id)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default RealtimeCart;