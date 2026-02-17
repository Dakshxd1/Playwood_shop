import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders", {
      headers: {
        phone: "9812879214",
        password: "Anshu@123"
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => {
      console.error("Failed to load orders", err);
      alert("Failed to load orders");
    });
  }, []);

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
