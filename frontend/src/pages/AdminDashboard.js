import React, { useState, useEffect } from "react";
import api from "../api";

export default function AdminDashboard({ isAdmin }) {
  const [product, setProduct] = useState({
    name: "",
    type: "",
    thickness: "",
    price_per_sqft: "",
    description: ""
  });

  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const addProduct = async () => {
    if (!isAdmin) return alert("Admin login required");

    try {
      const res = await api.post("/products", product, {
        headers: { phone: "9812879214", password: "Anshu@123" }
      });

      const productId = res.data.id;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(img => formData.append("images", img));
        await api.post(`/upload/${productId}`, formData);
      }

      alert("Product added!");
      window.location.reload();
    } catch {
      alert("Error adding product");
    }
  };

  const deleteProduct = async (id) => {
    if (!isAdmin) return;

    await api.delete(`/products/${id}`, {
      headers: { phone: "9812879214", password: "Anshu@123" }
    });

    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="panel">
      <h2>Admin Dashboard</h2>

      <h3>Add Product</h3>
      <input placeholder="Name" onChange={e => setProduct({ ...product, name: e.target.value })} />
      <input placeholder="Type" onChange={e => setProduct({ ...product, type: e.target.value })} />
      <input placeholder="Thickness" onChange={e => setProduct({ ...product, thickness: e.target.value })} />
      <input placeholder="Price per sqft" onChange={e => setProduct({ ...product, price_per_sqft: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setProduct({ ...product, description: e.target.value })} />

      <input type="file" multiple onChange={e => setImages([...e.target.files])} />
      <button onClick={addProduct}>Add Product</button>

      <hr />

      <h3>Existing Products</h3>
      {products.map(p => (
        <div key={p.id} className="card">
          <p><b>{p.name}</b></p>
          <p>₹ {p.price_per_sqft}/sqft</p>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}