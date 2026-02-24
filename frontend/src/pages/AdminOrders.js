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

      setOrders(orders.filter(o => o.id !== id));
      alert("✅ Order completed & removed");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to remove order");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders yet</p>;

  return (
    <div className="panel">
      <h2>Customer Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="card">
          <div style={headerRow}>
            <h3>Order #{order.id}</h3>
            <span style={statusBadge}>Pending</span>
          </div>

          <p><b>Name:</b> {order.customer_name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Address:</b> {order.address}</p>

          <h4>Items:</h4>
          {order.items.map(item => (
            <div key={item.id} style={itemRow}>
              <span>{item.name}</span>
              <span>{item.length} × {item.width} ft</span>
              <span>Qty: {item.quantity}</span>
            </div>
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

/* 🎨 Styles */
const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "4px 0",
  borderBottom: "1px solid #eee"
};

const statusBadge = {
  background: "#ffc107",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "bold"
};

const completeBtn = {
  marginTop: 12,
  padding: "8px 14px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold"
};