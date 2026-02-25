import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Product load error:", err));
  }, []);

  const addToCart = (item) => {
    if (!item.price || item.price <= 0) {
      alert("Please enter valid size or quantity");
      return;
    }

    setCart(prev => [...prev, item]);
    alert(`${item.product.name} added to cart`);
  };

  return (
    <div className="panel">
      <h1>🪵 Plywood & Hardware Shop</h1>

      <div className="grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}