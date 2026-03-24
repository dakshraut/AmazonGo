// frontend/src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart and they will appear here</p>
        <Link 
          to="/products" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center border-b py-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-1 ml-4">
                <Link to={`/product/${item._id}`} className="font-semibold hover:text-blue-600">
                  {item.name}
                </Link>
                <p className="text-gray-600">${item.price}</p>
                
                <div className="flex items-center mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 font-bold flex justify-between">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;