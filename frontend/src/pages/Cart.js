import React from "react";

export default function Cart({ cart, setCart }) {

  const updateQty = (index, qty) => {
    const updated = [...cart];
    const item = updated[index];

    item.qty = qty;

    // recalc price
    item.price = item.isAreaProduct
      ? Number(item.length) * Number(item.width) * item.product.price_per_sqft
      : qty * item.product.price_per_sqft;

    setCart(updated);
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="panel">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, i) => (
        <div key={i} className="card">
          <b>{item.product.name}</b>

          {/* AREA PRODUCT */}
          {item.isAreaProduct ? (
            <p>Size: {item.length} × {item.width} ft</p>
          ) : (
            <>
              <p>Quantity:</p>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={e => updateQty(i, Number(e.target.value))}
              />
            </>
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