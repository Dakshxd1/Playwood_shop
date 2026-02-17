import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load orders
  const loadOrders = async () => {
    try {
      const res = await api.get("/orders", {
        headers: {
          phone: "9812879214",
          password: "Anshu@123"
        }
      });

      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load orders:", err);
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // 🔹 Complete / Remove Order
  const completeOrder = async (id) => {
    if (!window.confirm("Mark this order as completed?")) return;

    try {
      await api.delete(`/orders/${id}`, {
        headers: {
          phone: "9812879214",
          password: "Anshu@123"
        }
      });

      // ✅ Reload orders from server (safe & correct)
      loadOrders();

      alert("Order completed & removed");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to remove order");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders yet</p>;

  return (
    <div>
      <h2>Customer Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={cardStyle}>
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Name:</b> {order.customer_name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Address:</b> {order.address}</p>

          <h4>Items:</h4>
          {order.items.map(item => (
            <p key={item.id}>
              {item.name} — {item.length}ft × {item.width}ft — Qty: {item.quantity}
            </p>
          ))}

          <button
            onClick={() => completeOrder(order.id)}
            style={completeBtn}
          >
            ✔ Complete Order
          </button>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  margin: 10,
  padding: 10,
  borderRadius: 8,
  background: "#fafafa"
};

const completeBtn = {
  marginTop: 10,
  padding: "6px 12px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer"
};
