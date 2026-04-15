// frontend/src/components/FeaturedProductsSection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductImage } from '../utils/productImages';

const FeaturedProductsSection = ({ products, loading }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg mb-4">No products available yet</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Browse our catalog →
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recommended For You
          </h2>
          <p className="text-gray-600 text-base">Based on your shopping interests</p>
          <div className="h-1 w-20 bg-yellow-400 mt-3 rounded"></div>
        </div>

        {/* Main Featured Product Spotlight */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Large Featured Item - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
              <div className="w-full h-72 overflow-hidden rounded-t-xl bg-white flex items-center justify-center">
                {products[0] && (
                  !imageErrors[products[0]._id] ? (
                    <img
                      src={getProductImage(products[0])}
                      alt={products[0].name || 'Featured Product'}
                      className="w-full h-72 object-cover hover:scale-105 transition-transform"
                      onError={() => handleImageError(products[0]._id)}
                    />
                  ) : (
                    <div className="text-6xl text-gray-300">📦</div>
                  )
                )}
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider mb-2 font-semibold text-gray-600">
                    {products[0]?.category || 'Products'}
                  </p>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">
                    {products[0]?.name || 'Product'}
                  </h3>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${(products[0]?.price || 0).toFixed(2)}
                    </span>
                    {products[0]?.stock > 0 && (
                      <span className="text-xs bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
                        ✓ In Stock
                      </span>
                    )}
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 shadow-md">
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Two Featured Items */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.slice(1, 3).map((product, index) => (
              <div
                key={product._id || index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
              >
              <div className="w-full h-48 overflow-hidden rounded-t-xl bg-white flex items-center justify-center">
                {!imageErrors[product._id] ? (
                  <img
                    src={getProductImage(product)}
                    alt={product.name || 'Product'}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform"
                    onError={() => handleImageError(product._id)}
                  />
                ) : (
                  <div className="text-5xl text-gray-300">📦</div>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-1 font-semibold text-gray-600">
                      {product.category || 'Products'}
                    </p>
                    <h4 className="font-semibold text-base mb-2 line-clamp-2 text-gray-900">
                      {product.name || 'Product'}
                    </h4>
                  </div>
                  <div>
                    <p className="text-xl font-bold mb-3 text-gray-900">
                      ${(product.price || 0).toFixed(2)}
                    </p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Deals Banner */}
        <div className="mb-10 rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-blue-600 to-blue-700">
          <h3 className="text-2xl font-bold mb-2">⚡ Today's Deals</h3>
          <p className="text-base opacity-90">Limited time offers on selected items</p>
        </div>

        {/* Product Grid Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-2xl font-bold text-gray-900">🌟 Best Sellers</h3>
            <div className="h-1 w-12 bg-yellow-400 rounded"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {products.slice(0, 10).map((product) => (
              <Link
                key={product._id || product.id}
                to={`/product/${product._id}`}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-2" style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="h-40 overflow-hidden rounded-t-xl bg-white flex items-center justify-center">
                  {!imageErrors[product._id] ? (
                    <img
                      src={getProductImage(product)}
                      alt={product.name || 'Product'}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform"
                      onError={() => handleImageError(product._id)}
                    />
                  ) : (
                    <div className="text-4xl text-gray-300">📦</div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-semibold line-clamp-2 mb-2 text-gray-900">
                    {product.name || 'Product'}
                  </h4>
                  <p className="text-base font-bold mb-2 text-gray-900">
                    ${(product.price || 0).toFixed(2)}
                  </p>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="text-sm text-yellow-400">★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(28)</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity transform">
                    Add Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-10">
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            👉 Shop All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
