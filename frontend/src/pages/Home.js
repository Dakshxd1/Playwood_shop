import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product, length, width, price) => {
    const item = {
      product,
      length,
      width,
      price
    };

    setCart([...cart, item]);
    alert(`${product.name} added to cart\nTotal: ₹${price}`);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Plywood & Timber Shop</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search plywood or timber..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={searchStyle}
      />

      {/* 🧱 Product Grid */}
      <div className="grid">
        {filteredProducts.map(product => (
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

const searchStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};
