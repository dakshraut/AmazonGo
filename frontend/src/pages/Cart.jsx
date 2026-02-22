import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { Loader } from "../components/Loader";

export default function Cart() {
  const { cart, loadCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(()=>{ 
    loadCart();
    setLoading(false);
  },[]);

  useEffect(() => {
    const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    setTotal(cartTotal);
  }, [cart]);

  if (loading) return <Loader />;

  return (
    <div className="main-content">
      <h1>🛒 Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <h2>Your cart is empty</h2>
          <p style={{color: '#666', marginTop: '10px'}}>Continue shopping to add items</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            <h2>{cart.length} Items</h2>
            {cart.map(item=>(
              <div key={item._id} className="cart-item">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p style={{fontSize: '13px', color: '#666'}}>Quantity: 1</p>
                </div>
                <div className="item-price">${item.price?.toFixed(2)}</div>
                <button 
                  onClick={()=>removeFromCart(item._id)}
                  style={{
                    background: '#c33',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}