// frontend/src/pages/Products.jsx
import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [stockOnly, setStockOnly] = useState(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);

  // Filter options
  const categoryOptions = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'];
  const priceRanges = [
    { id: 'under25', label: 'Under $25', min: 0, max: 25 },
    { id: 'range25-50', label: '$25-$50', min: 25, max: 50 },
    { id: 'range50-100', label: '$50-$100', min: 50, max: 100 },
    { id: 'over100', label: 'Over $100', min: 100, max: Infinity }
  ];
  const ratingOptions = [
    { id: 'rating4', label: '★ 4 & above', minRating: 4 },
    { id: 'rating3', label: '★ 3 & above', minRating: 3 },
    { id: 'rating2', label: '★ 2 & above', minRating: 2 }
  ];

  // Handle checkbox changes
  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const togglePriceRange = (id) => {
    setSelectedPriceRanges(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleRating = (id) => {
    setSelectedRatings(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    setStockOnly(false);
    setFreeDeliveryOnly(false);
    setSearch('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
                           selectedPriceRanges.length > 0 || 
                           selectedRatings.length > 0 || 
                           stockOnly || 
                           freeDeliveryOnly || 
                           search.length > 0;

  // Apply all filters with AND logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                           product.description?.toLowerCase().includes(search.toLowerCase());
      
      // Category filter (OR within category)
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
      
      // Price range filter (OR within price)
      const matchesPrice = selectedPriceRanges.length === 0 || 
                          selectedPriceRanges.some(priceId => {
                            const range = priceRanges.find(r => r.id === priceId);
                            return product.price >= range.min && product.price <= range.max;
                          });
      
      // Rating filter (OR within rating - lowest threshold applies)
      const matchesRating = selectedRatings.length === 0 || 
                           selectedRatings.some(ratingId => {
                             const ratingOpt = ratingOptions.find(r => r.id === ratingId);
                             return (product.rating || 0) >= ratingOpt.minRating;
                           });
      
      // Stock filter
      const matchesStock = !stockOnly || product.stock > 0;
      
      // Free delivery filter
      const matchesDelivery = !freeDeliveryOnly || product.freeDelivery === true;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock && matchesDelivery;
    });
  }, [products, search, selectedCategories, selectedPriceRanges, selectedRatings, stockOnly, freeDeliveryOnly]);

  if (loading) return <div className="text-center py-8">Loading products...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle filters"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className={`${
            sidebarOpen ? 'block' : 'hidden'
          } md:block md:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categoryOptions.map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.id} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range.id)}
                        onChange={() => togglePriceRange(range.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Rating</h3>
                <div className="space-y-2">
                  {ratingOptions.map(rating => (
                    <label key={rating.id} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating.id)}
                        onChange={() => toggleRating(rating.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{rating.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={stockOnly}
                    onChange={() => setStockOnly(!stockOnly)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">In Stock Only</span>
                </label>
              </div>

              {/* Free Delivery Filter */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={freeDeliveryOnly}
                    onChange={() => setFreeDeliveryOnly(!freeDeliveryOnly)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">Free Delivery Only</span>
                </label>
              </div>

              {/* Close button for mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow p-4">
              <div>
                <p className="text-gray-700">
                  Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> of <span className="font-bold text-gray-900">{products.length}</span> products
                </p>
                {hasActiveFilters && (
                  <p className="text-sm text-gray-500 mt-1">
                    Filters applied • <button onClick={clearAllFilters} className="text-blue-600 hover:text-blue-800 font-medium">Clear all</button>
                  </p>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <p className="text-gray-500 text-lg mb-4">No products found matching your filters</p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Products;