import React from "react";
import { useCart } from "../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image || "/placeholder.png"} alt={product.name} />
      
      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>

      <div className="rating">
        ⭐ {product.rating || 4.5} / 5
      </div>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;