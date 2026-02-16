import React, { useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [product, setProduct] = useState({
    name: "",
    type: "",
    thickness: "",
    price_per_sqft: "",
    description: ""
  });

  const [images, setImages] = useState([]);

  const addProduct = async () => {
    try {
      // Add product
      const res = await api.post("/products", product);
      const productId = res.data.id;

      // Upload images
      const formData = new FormData();
      images.forEach(img => formData.append("images", img));

      await api.post(`/upload/${productId}`, formData);

      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <input placeholder="Name" onChange={e => setProduct({...product, name: e.target.value})} />
      <input placeholder="Type" onChange={e => setProduct({...product, type: e.target.value})} />
      <input placeholder="Thickness" onChange={e => setProduct({...product, thickness: e.target.value})} />
      <input placeholder="Price per sqft" onChange={e => setProduct({...product, price_per_sqft: e.target.value})} />
      <textarea placeholder="Description" onChange={e => setProduct({...product, description: e.target.value})} />

      <input type="file" multiple onChange={e => setImages([...e.target.files])} />

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}
