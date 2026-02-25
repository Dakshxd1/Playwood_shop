import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // 🔹 Load products
  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Product load error:", err));
  }, []);

  // 🔹 Add to cart (SAFE version)
  const addToCart = (product, details) => {
    if (!details.price || details.price <= 0) {
      alert("Please enter size or quantity");
      return;
    }

    setCart(prevCart => [
      ...prevCart,
      {
        product,
        ...details
      }
    ]);

    alert(`${product.name} added to cart`);
  };

  // 🔹 Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || p.type === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="panel">
      <h1>🪵 Plywood & Hardware Shop</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={inputStyle}
      />

      {/* 📂 CATEGORY FILTER */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={inputStyle}
      >
        <option value="">All Categories</option>
        <option value="Plywood">Plywood</option>
        <option value="Timber">Timber</option>
        <option value="Door">Door</option>
        <option value="Door Handle">Door Handle</option>
        <option value="Panel">Panel Sheet</option>
        <option value="Hardware">Hardware</option>
        <option value="Screw">Screw</option>
      </select>

      {/* 🧱 PRODUCT GRID */}
      <div className="grid">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};