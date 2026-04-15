// frontend/src/components/ProductCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { triggerWishlistUpdate, saveWishlist, loadWishlist } from '../utils/dashboardHelpers';
import { getProductImage, categoryImageMap } from '../utils/productImages';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  // Set initial image source
  useEffect(() => {
    if (product) {
      setImgSrc(getProductImage(product));
    }
  }, [product]);

  // Check if product is in wishlist on mount
  useEffect(() => {
    const wishlist = loadWishlist();
    const inWishlist = wishlist.some(item => item._id === product._id);
    setIsInWishlist(inWishlist);
  }, [product._id]);

  if (!product) return null;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }
    
    setIsAdding(true);
    await addToCart(product, 1);
    setIsAdding(false);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const wishlist = loadWishlist();
    let updatedWishlist;
    let action;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item._id !== product._id);
      action = 'remove';
    } else {
      updatedWishlist = [...wishlist, product];
      action = 'add';
    }

    saveWishlist(updatedWishlist);
    triggerWishlistUpdate(updatedWishlist, action, product);
    setIsInWishlist(!isInWishlist);
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleImageError = () => {
    // Try category fallback first
    if (product.category && categoryImageMap[product.category]) {
      setImgSrc(categoryImageMap[product.category]);
    } else {
      // Ultimate fallback
      setImgSrc('https://placehold.co/400x400/cccccc/666?text=📦+Product');
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl 
                 transition-all duration-300 transform hover:-translate-y-2 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </span>
        )}
        {product.rating >= 4.5 && (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ⭐ Best Seller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-red-50"
        onClick={handleWishlistToggle}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg className={`w-5 h-5 transition-colors ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'}`} 
             fill={isInWishlist ? 'currentColor' : 'none'} 
             stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link to={`/product/${product._id}`} className="block">
        {/* Product Image - IMPROVED */}
        <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-xl">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Category Tag */}
          <p className="text-xs text-blue-600 mb-1">{product.category}</p>
          
          {/* Product Name */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-blue-600 
                       transition-colors">
            {product.name || 'Product Name'}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating || 4) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">
              ({product.reviews || 0})
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900">
              ${product.price !== undefined && product.price !== null ? product.price.toFixed(2) : '0.00'}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <span className="text-green-600">✓</span> Free Delivery
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <span className="text-green-600">↺</span> 30-Day Returns
            </span>
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            {product.stock > 10 ? (
              <p className="text-xs text-green-600">✓ In Stock</p>
            ) : product.stock > 0 ? (
              <p className="text-xs text-orange-600">
                ⚠ Only {product.stock} left in stock
              </p>
            ) : (
              <p className="text-xs text-red-600">✗ Out of Stock</p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className={`w-full py-2 rounded-lg font-semibold transition-all duration-300
                      flex items-center justify-center gap-2
                      ${product.stock > 0
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                        : 'bg-gray-300 cursor-not-allowed text-gray-600'
                      }`}
          >
            {isAdding ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" 
                          stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <span>🛒</span>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </>
            )}
          </button>

          {/* Prime Badge */}
          <div className="mt-2 flex items-center justify-center gap-1 text-xs text-blue-600">
            <span className="text-lg">⚡</span>
            <span>FREE Delivery by AmazonGo Prime</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;