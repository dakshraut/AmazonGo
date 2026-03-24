// frontend/src/pages/Products.jsx
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center py-8">Loading products...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No products found</p>
      )}
    </div>
  );
};

export default Products;