import React from "react";

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="panel">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, i) => (
        <div key={i} className="card">
          <p><strong>{item.product.name}</strong></p>
          <p>Size: {item.length} × {item.width} ft</p>
          <p>₹ {item.price}</p>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}