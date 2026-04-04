import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../services/productService';

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      const data = await getProductsByCategory(category);
      setProducts(data);
      setLoading(false);
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Category display info
  const categoryInfo = {
    Electronics: {
      icon: "💻",
      bg: "from-blue-500 to-blue-600",
      description: "Explore the latest electronics and gadgets"
    },
    Fashion: {
      icon: "👕",
      bg: "from-purple-500 to-purple-600",
      description: "Discover the latest fashion trends"
    },
    Home: {
      icon: "🏠",
      bg: "from-green-500 to-green-600",
      description: "Beautiful products for your home"
    },
    Sports: {
      icon: "⚽",
      bg: "from-red-500 to-red-600",
      description: "Sports equipment and gear"
    },
    Books: {
      icon: "📚",
      bg: "from-yellow-500 to-yellow-600",
      description: "Books for every reader"
    },
    Beauty: {
      icon: "💄",
      bg: "from-pink-500 to-pink-600",
      description: "Premium beauty and skincare products"
    }
  };

  const catInfo = categoryInfo[category] || {
    icon: "🛍️",
    bg: "from-gray-500 to-gray-600",
    description: "Browse our collection"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className={`bg-gradient-to-r ${catInfo.bg} text-white py-12 mb-8`}>
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:underline flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-2">
            {catInfo.icon} {category}
          </h1>
          <p className="text-lg opacity-90">{catInfo.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={`Search in ${category}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div>
            <p className="text-gray-600 mb-6">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} in {category}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              {search
                ? `No products matching "${search}" in ${category}`
                : `No products available in ${category}`}
            </p>
            <button
              onClick={() => {
                if (search) {
                  setSearch('');
                } else {
                  navigate('/');
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {search ? 'Clear Search' : 'Back to Home'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
