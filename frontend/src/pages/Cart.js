import React from "react";

export default function Cart({ cart, setCart }) {
  const updateQty = (index, qty) => {
    const updated = [...cart];
    updated[index].qty = qty;

    const price = updated[index].product.price_per_sqft;
    updated[index].price = qty * price;

    setCart(updated);
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="panel">
      <h2>Your Cart</h2>

      {cart.map((item, i) => (
        <div key={i} className="card">
          <b>{item.product.name}</b>

          {/* Quantity for hardware */}
          {!item.length && (
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={e => updateQty(i, e.target.value)}
            />
          )}

          <p>₹ {item.price}</p>

          <button
            onClick={() => removeItem(i)}
            style={{ background: "#dc3545" }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}