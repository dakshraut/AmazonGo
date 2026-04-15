import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartRecommendations from '../components/CartRecommendations';
import PaymentModal from '../components/PaymentModal';
import { getProductImage } from '../utils/productImages';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };
  const [lastTransactionId, setLastTransactionId] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setIsPaymentModalOpen(true);
      setPaymentSuccess(false);
    }
  };

  const handlePaymentComplete = (transactionId) => {
    setLastTransactionId(transactionId);
    setPaymentSuccess(true);

    // Create order object with complete structure matching Dashboard requirements
    const subtotal = cartTotal;
    const tax = parseFloat((cartTotal * 0.08).toFixed(2)); // 8% tax
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      transactionId: transactionId,
      trackingId: `TRACK${Date.now().toString().slice(-9)}`,
      items: cartItems,
      subtotal: subtotal,
      shipping: 0,
      tax: tax,
      total: parseFloat((subtotal + tax).toFixed(2)),
      status: 'confirmed',
      placedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      shippingAddress: {
        street: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      timeline: [
        { step: 'Ordered', completed: true },
        { step: 'Confirmed', completed: false },
        { step: 'Shipped', completed: false },
        { step: 'Delivered', completed: false }
      ]
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Dispatch custom event to notify Dashboard of new order
    window.dispatchEvent(new CustomEvent('orderPlaced', {
      detail: {
        order: newOrder
      }
    }));

    clearCart();
    setTimeout(() => {
      setIsPaymentModalOpen(false);
      setPaymentSuccess(false);
    }, 3000);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const incrementQuantity = (productId, currentQuantity) => {
    handleQuantityChange(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId, currentQuantity) => {
    handleQuantityChange(productId, currentQuantity - 1);
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      setPromoCode('');
    }
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827' }}>Shopping Cart</h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>Your cart is empty</p>
          </div>
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '12px', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem' }}>🛒</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Your cart is empty</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Add items to your cart and come back here to proceed with checkout.</p>
            <Link to="/products" style={{ display: 'inline-flex', padding: '0.75rem 2rem', background: '#3399cc', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600' }}>Continue Shopping →</Link>
          </div>
        </div>
      </div>
    );
  }

  // Cart with items - TWO COLUMN LAYOUT WITH INLINE STYLES
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827' }}>Shopping Cart</h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        {/* TWO COLUMN LAYOUT - FORCED */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', width: '100%' }}>
          
          {/* LEFT COLUMN - Cart Items */}
          <div>
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              {cartItems.map(item => (
                <div key={item._id} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #f3f4f6', gap: '1rem' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {!imageErrors[item._id] ? (
                      <img 
                        src={getProductImage(item)} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={() => handleImageError(item._id)}
                      />
                    ) : (
                      <span style={{ fontSize: '32px' }}>📦</span>
                    )}
                  </div>
                  <div style={{ flex: 2 }}>
                    <Link to={`/product/${item._id}`} style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', textDecoration: 'none' }}>{item.name}</Link>
                    <p style={{ fontSize: '1rem', fontWeight: '500', color: '#6b7280', marginTop: '0.25rem' }}>${item.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f9fafb', borderRadius: '8px', padding: '0.25rem' }}>
                        <button 
                          onClick={() => decrementQuantity(item._id, item.quantity)} 
                          disabled={item.quantity <= 1} 
                          style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '8px', fontSize: '1.125rem', fontWeight: '600', color: '#3399cc', cursor: 'pointer' }}
                        >−</button>
                        <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '600' }}>{item.quantity}</span>
                        <button 
                          onClick={() => incrementQuantity(item._id, item.quantity)} 
                          style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '8px', fontSize: '1.125rem', fontWeight: '600', color: '#3399cc', cursor: 'pointer' }}
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id)} 
                        style={{ padding: '0.5rem 1rem', border: '1px solid #ef4444', background: 'white', color: '#ef4444', borderRadius: '6px', cursor: 'pointer' }}
                      >Remove</button>
                    </div>
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '700', minWidth: '80px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Order Summary (Sticky) */}
          <div>
            <div style={{ position: 'sticky', top: '20px' }}>
              <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg, #3399cc 0%, #2874a6 100%)', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Order Summary</h2>
                  <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Review your order details</p>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  
                  {/* Promo Code */}
                  <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Have a promo code?</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        placeholder="Enter promo code" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                        style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }} 
                      />
                      <button 
                        onClick={applyPromoCode} 
                        disabled={!promoCode.trim()} 
                        style={{ padding: '0.75rem 1.5rem', background: '#3399cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                      >Apply</button>
                    </div>
                    {promoApplied && <p style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.5rem' }}>Promo code applied successfully!</p>}
                  </div>

                  {/* Order Breakdown */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span>Shipping</span><span>Free</span>
                    </div>
                    {promoApplied && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                        <span>Discount</span><span style={{ color: '#10b981' }}>-$5.00</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', marginTop: '0.5rem', borderTop: '2px solid #3399cc', fontWeight: '700', fontSize: '1.125rem' }}>
                      <span>Total</span><span>${(promoApplied ? cartTotal - 5 : cartTotal).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Accepted Payment Methods</h3>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <div style={{ width: '44px', height: '32px', background: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💳</div>
                      <div style={{ width: '44px', height: '32px', background: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🅿️</div>
                      <div style={{ width: '44px', height: '32px', background: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💰</div>
                      <div style={{ width: '44px', height: '32px', background: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📱</div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button 
                    onClick={handleCheckout} 
                    style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #3399cc 0%, #2874a6 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
                  >Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations - Full Width Bottom */}
        <div style={{ marginTop: '3rem', width: '100%' }}>
          <CartRecommendations />
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        cartTotal={cartTotal} 
        onClose={handleClosePaymentModal} 
        onPaymentComplete={handlePaymentComplete} 
      />
    </div>
  );
};

export default Cart;