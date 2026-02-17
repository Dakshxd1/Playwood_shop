import React, { useState, useEffect } from "react";
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
  const [products, setProducts] = useState([]);

  // 🔹 Load products
  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  // 🔹 Add Product
  const addProduct = async () => {
    try {
      // ✅ Send admin headers
      const res = await api.post("/products", product, {
        headers: {
          phone: "9812879214",
          password: "Anshu@123"
        }
      });

      const productId = res.data.id;

      // Upload images
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(img => formData.append("images", img));

        await api.post(`/upload/${productId}`, formData, {
          headers: {
            phone: "9812879214",
            password: "Anshu@123"
          }
        });
      }

      alert("Product added successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  // 🔹 Delete Product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          phone: "9812879214",
          password: "Anshu@123"
        }
      });

      alert("Product deleted");
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Add Product Form */}
      <input placeholder="Name" onChange={e => setProduct({ ...product, name: e.target.value })} />
      <input placeholder="Type" onChange={e => setProduct({ ...product, type: e.target.value })} />
      <input placeholder="Thickness" onChange={e => setProduct({ ...product, thickness: e.target.value })} />
      <input placeholder="Price per sqft" onChange={e => setProduct({ ...product, price_per_sqft: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setProduct({ ...product, description: e.target.value })} />

      <input type="file" multiple onChange={e => setImages([...e.target.files])} />

      <button onClick={addProduct}>Add Product</button>

      <hr />

      {/* Product List */}
      <h3>Existing Products</h3>
      {products.map(product => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <p><b>{product.name}</b></p>
          <p>₹ {product.price_per_sqft}/sqft</p>

          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
