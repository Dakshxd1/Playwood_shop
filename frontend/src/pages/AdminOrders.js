import React, { useEffect, useState } from "react";
import api from "../api";
import jsPDF from "jspdf";

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

  // 🔹 Download PDF
  const downloadPDF = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Plywood Shop - Order Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 30);
    doc.text(`Customer: ${order.customer_name}`, 20, 40);
    doc.text(`Phone: ${order.phone}`, 20, 50);
    doc.text(`Address: ${order.address}`, 20, 60);

    let y = 80;
    doc.text("Items:", 20, y);
    y += 10;

    order.items.forEach(item => {
      doc.text(
        `${item.name} | Qty: ${item.quantity} | ${item.length || "-"} x ${item.width || "-"}`,
        20,
        y
      );
      y += 10;
    });

    doc.save(`order_${order.id}.pdf`);
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
              <span>Qty: {item.quantity}</span>
              <span>
                {item.length ? `${item.length} × ${item.width}` : ""}
              </span>
            </div>
          ))}

          <div style={buttonRow}>
            <button onClick={() => downloadPDF(order)}>
              📄 Download PDF
            </button>

            <button
              onClick={() => completeOrder(order.id)}
              style={completeBtn}
            >
              ✔ Complete Order
            </button>
          </div>
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
  borderBottom: "1px solid #eee",
  padding: "4px 0"
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px"
};

const statusBadge = {
  background: "#ffc107",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "bold"
};

const completeBtn = {
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "8px 12px",
  cursor: "pointer"
};