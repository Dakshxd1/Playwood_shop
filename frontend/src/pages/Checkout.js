import React, { useState } from "react";
import api from "../api";

export default function Checkout({ cart, setCart }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    try {
      await api.post("/orders", {
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        items: cart.map(item => ({
          product_id: item.product.id,
          length: item.length,
          width: item.width,
          quantity: 1,
          total_price: item.price
        }))
      });

      alert("✅ Order placed successfully!");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>

      <input
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Phone"
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        placeholder="Address"
        onChange={e => setForm({ ...form, address: e.target.value })}
      />

      <h3>Total: ₹{total}</h3>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
