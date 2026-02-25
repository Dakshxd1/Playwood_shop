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

  const [editingId, setEditingId] = useState(null);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  // Load products
  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  // ================= ADD PRODUCT =================
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

  // ================= START EDIT =================
  const startEdit = (p) => {
    setEditingId(p.id);
    setProduct({
      name: p.name,
      type: p.type,
      thickness: p.thickness,
      price_per_sqft: p.price_per_sqft,
      description: p.description
    });
  };

  // ================= UPDATE PRODUCT =================
  const updateProduct = async () => {
    try {
      await api.put(`/products/${editingId}`, product, {
        headers: { phone: "9812879214", password: "Anshu@123" }
      });

      alert("Product updated!");
      setEditingId(null);
      window.location.reload();
    } catch {
      alert("Update failed");
    }
  };

  // ================= DELETE PRODUCT =================
  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`, {
      headers: { phone: "9812879214", password: "Anshu@123" }
    });

    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="panel">
      <h2>🛠 Admin Dashboard</h2>

      {/* ================= ADD / EDIT FORM ================= */}
      <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

      <input
        placeholder="Name"
        value={product.name}
        onChange={e => setProduct({ ...product, name: e.target.value })}
      />

      <select
        value={product.type}
        onChange={e => setProduct({ ...product, type: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Plywood">Plywood</option>
        <option value="Timber">Timber</option>
        <option value="Door">Door</option>
        <option value="Door Handle">Door Handle</option>
        <option value="Panel">Panel Sheet</option>
        <option value="Hardware">Hardware</option>
        <option value="Screw">Screw</option>
      </select>

      <input
        placeholder="Thickness"
        value={product.thickness}
        onChange={e => setProduct({ ...product, thickness: e.target.value })}
      />

      <input
        placeholder="Price"
        value={product.price_per_sqft}
        onChange={e => setProduct({ ...product, price_per_sqft: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={product.description}
        onChange={e => setProduct({ ...product, description: e.target.value })}
      />

      {editingId ? (
        <button onClick={updateProduct}>💾 Update Product</button>
      ) : (
        <>
          <input type="file" multiple onChange={e => setImages([...e.target.files])} />
          <button onClick={addProduct}>➕ Add Product</button>
        </>
      )}

      <hr />

      {/* ================= PRODUCT LIST ================= */}
      <h3>Existing Products</h3>

      {products.map(p => (
        <div key={p.id} className="card">
          <b>{p.name}</b>
          <p className="badge">{p.type}</p>
          <p>₹ {p.price_per_sqft}</p>

          <button onClick={() => startEdit(p)}>Edit</button>
          <button
            onClick={() => deleteProduct(p.id)}
            style={{ background: "#dc3545", marginLeft: 5 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}