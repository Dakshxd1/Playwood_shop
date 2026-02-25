import React, { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function ProductCard({ product, addToCart }) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [qty, setQty] = useState(1);

  const isAreaProduct =
    product.type === "Plywood" ||
    product.type === "Timber" ||
    product.type === "Door";

  const totalPrice = isAreaProduct
    ? (Number(length) || 0) *
      (Number(width) || 0) *
      Number(product.price_per_sqft)
    : (Number(qty) || 0) *
      Number(product.price_per_sqft);

  const handleAdd = () => {
    if (isAreaProduct) {
      if (!length || !width) {
        alert("Enter length & width");
        return;
      }
    } else {
      if (!qty || qty < 1) {
        alert("Enter valid quantity");
        return;
      }
    }

    // ✅ SEND ONE OBJECT
    addToCart({
      product,
      length: isAreaProduct ? Number(length) : null,
      width: isAreaProduct ? Number(width) : null,
      qty: isAreaProduct ? 1 : Number(qty),
      isAreaProduct,
      price: totalPrice
    });

    setLength("");
    setWidth("");
    setQty(1);
  };

  return (
    <div className="card">
      <ImageSlider images={product.images || []} />

      <p className="badge">{product.type}</p>
      <h3>{product.name}</h3>

      {product.thickness && <p>Thickness: {product.thickness}</p>}

      <p>
        ₹{product.price_per_sqft} {isAreaProduct ? "/sqft" : "each"}
      </p>

      {isAreaProduct ? (
        <>
          <input
            type="number"
            placeholder="Length (ft)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <input
            type="number"
            placeholder="Width (ft)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </>
      ) : (
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      )}

      <p><b>Total: ₹{totalPrice}</b></p>

      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}