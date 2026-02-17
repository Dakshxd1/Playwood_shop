import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    api.get("/orders", {
      headers: {
        phone: "9812879214",
        password: "Anshu@123"
      }
    }).then(res => setOrders(res.data));
  };

  // ✅ Complete / Remove Order
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
      alert("Order completed");
    } catch (err) {
      console.error(err);
      alert("Failed to remove order");
    }
  };

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

          {/* ✅ Complete button */}
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
