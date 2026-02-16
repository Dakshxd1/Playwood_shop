import React from "react";

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, i) => (
        <div key={i} style={itemStyle}>
          <p><strong>{item.product.name}</strong></p>
          <p>Size: {item.length} x {item.width}</p>
          <p>₹ {item.price}</p>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

const itemStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px"
};
