import React, { useState } from "react";
import api from "../api";
import jsPDF from "jspdf";

export default function Checkout({ cart, setCart }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Plywood Shop - Receipt", 20, 20);
    doc.text(`Customer: ${form.name}`, 20, 30);
    doc.text(`Phone: ${form.phone}`, 20, 40);
    doc.text(`Address: ${form.address}`, 20, 50);

    let y = 70;
    cart.forEach(item => {
      doc.text(`${item.product.name} - ₹${item.price}`, 20, y);
      y += 10;
    });

    doc.text(`Total: ₹${total}`, 20, y + 10);

    doc.save("receipt.pdf");
  };

  const placeOrder = async () => {
    await api.post("/orders", {
      customer_name: form.name,
      phone: form.phone,
      address: form.address,
      items: cart.map(item => ({
        product_id: item.product.id,
        quantity: item.qty || 1,
        total_price: item.price
      }))
    });

    generatePDF();
    setCart([]);
    alert("Order placed!");
  };

  return (
    <div className="panel">
      <h2>Checkout</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <textarea placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />

      <h3>Total: ₹{total}</h3>
      <button onClick={placeOrder}>Place Order & Download Receipt</button>
    </div>
  );
}