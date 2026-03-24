// frontend/src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const product = getProductById(id);

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setAdding(true);
    await addToCart(product._id, quantity);
    setAdding(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-w-full h-auto max-h-96 object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>

          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="font-semibold">Category:</span>{' '}
            <span className="text-gray-600">{product.category}</span>
          </div>

          <div className="mb-6">
            <span className="font-semibold">Availability:</span>{' '}
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <>
              <div className="flex items-center mb-6">
                <label className="mr-4 font-semibold">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border rounded-lg px-3 py-2"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;