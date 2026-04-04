// frontend/src/components/FeaturedProductsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedProductsSection = ({ products, loading }) => {
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
              <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 h-72 flex items-center justify-center overflow-hidden">
                {products[0] && (
                  <>
                    <img
                      src={products[0].image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'}
                      alt={products[0].name || 'Featured Product'}
                      className="w-full h-full object-contain p-6 hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      🔥 Trending
                    </div>
                  </>
                )}
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                    {products[0]?.category || 'Products'}
                  </p>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
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
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-all transform hover:scale-105 shadow-md">
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
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-48 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-contain p-4 hover:scale-110 transition-transform"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ✓ {product.stock || 0} left
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                      {product.category || 'Products'}
                    </p>
                    <h4 className="font-semibold text-base mb-2 text-gray-900 line-clamp-2">
                      {product.name || 'Product'}
                    </h4>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 mb-3">
                      ${(product.price || 0).toFixed(2)}
                    </p>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg transition-all text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Deals Banner */}
        <div className="mb-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
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
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform"
                  />
                  {product.stock <= 10 && product.stock > 0 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                      {product.stock} left
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-semibold line-clamp-2 mb-2 text-gray-900">
                    {product.name || 'Product'}
                  </h4>
                  <p className="text-base font-bold text-gray-900 mb-2">
                    ${(product.price || 0).toFixed(2)}
                  </p>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="text-sm text-yellow-400">★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(28)</span>
                  </div>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-bold py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity transform">
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
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            👉 Shop All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
