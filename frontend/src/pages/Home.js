import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const addToCart = (product, length, width, price) => {
    setCart([...cart, { product, length, width, price }]);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || p.type === category)
  );

  return (
    <div>
      <h1>Plywood & Hardware Shop</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={searchStyle}
      />

      {/* ✅ CATEGORY FILTER */}
      <select value={category} onChange={e => setCategory(e.target.value)} style={searchStyle}>
        <option value="">All Categories</option>
        <option value="Plywood">Plywood</option>
        <option value="Timber">Timber</option>
        <option value="Door">Door</option>
        <option value="Door Handle">Door Handle</option>
        <option value="Panel">Panel</option>
        <option value="Hardware">Hardware</option>
        <option value="Screw">Screw</option>
      </select>

      <div className="grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

const searchStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};