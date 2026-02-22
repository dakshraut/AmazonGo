import React from "react";
import { useState, useEffect } from "react";
import productService from "../services/productService";
import { Loader } from "../components/Loader";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        setProducts(response);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h1>🛒 AmazonGo Dashboard</h1>
        <p>Welcome! Explore our curated collection of premium products with AI-powered recommendations.</p>
      </div>

      <div className="suggestion-panel">
        <h3>📦 Featured Products</h3>
        <div className="product-grid">
          {products && products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;