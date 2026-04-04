// frontend/src/context/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { productService } from '../services/api';

// Create context
const ProductContext = createContext();

// Custom hook for using product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getAll();
      console.log('API Response:', response);
      
      // Handle different response structures
      let productsData = [];
      
      if (response.data) {
        // Check if data.data exists (backend returns { success, count, data: [...] })
        if (Array.isArray(response.data.data)) {
          productsData = response.data.data;
        }
        // Check if data is an array directly
        else if (Array.isArray(response.data)) {
          productsData = response.data;
        } 
        // Check if data has a products property that's an array
        else if (response.data.products && Array.isArray(response.data.products)) {
          productsData = response.data.products;
        }
        // Check if data is an object with numeric keys (like {0: {...}, 1: {...}})
        else if (typeof response.data === 'object' && response.data !== null) {
          // Only use Object.values if it doesn't have known properties
          if (!response.data.success && !response.data.count) {
            productsData = Object.values(response.data);
          }
        }
      } 
      // If response itself is an array
      else if (Array.isArray(response)) {
        productsData = response;
      }
      // If response has a products property that's an array
      else if (response.products && Array.isArray(response.products)) {
        productsData = response.products;
      }
      // If response is an object with numeric keys
      else if (typeof response === 'object' && response !== null) {
        productsData = Object.values(response);
      }
      
      // Filter out any non-object items or items without required fields
      productsData = productsData.filter(item => item && typeof item === 'object' && item._id);
      
      console.log('Processed products:', productsData);
      setProducts(productsData);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(
        productsData
          .map(p => p.category)
          .filter(Boolean)
      )];
      setCategories(uniqueCategories);
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id) => {
    if (!Array.isArray(products)) return null;
    return products.find(p => p._id === id || p.id === id);
  };

  const getProductsByCategory = (category) => {
    if (!Array.isArray(products)) return [];
    if (!category) return products;
    return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  };

  const searchProducts = (query) => {
    if (!Array.isArray(products) || !query) return products;
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name?.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm) ||
      p.category?.toLowerCase().includes(searchTerm)
    );
  };

  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  const value = {
    products: Array.isArray(products) ? products : [],
    featuredProducts,
    loading,
    error,
    categories,
    getProductById,
    getProductsByCategory,
    searchProducts,
    refreshProducts: fetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};