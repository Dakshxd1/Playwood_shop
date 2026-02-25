import React from "react";

export default function Cart({ cart, setCart, goToCheckout }) {

  const updateQty = (index, newQty) => {
    const updated = [...cart];
    const item = updated[index];
    const qty = Number(newQty);

    item.qty = qty;

    if (!item.isAreaProduct) {
      item.price = qty * Number(item.product.price_per_sqft);
    }

    setCart(updated);
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="panel">
      <h2>Your Cart</h2>

      {cart.map((item, i) => (
        <div key={i} className="card">
          <b>{item.product.name}</b>

          {item.isAreaProduct ? (
            <p>Size: {item.length} × {item.width} ft</p>
          ) : (
            <>
              <p>Quantity:</p>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(i, e.target.value)}
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

      {cart.length > 0 && (
        <button
          onClick={goToCheckout}
          style={{ background: "#28a745", marginTop: 10 }}
        >
          Proceed to Checkout →
        </button>
      )}
    </div>
  );
}