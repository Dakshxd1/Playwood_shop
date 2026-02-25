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
    ? Number(length || 0) * Number(width || 0) * product.price_per_sqft
    : Number(qty) * product.price_per_sqft;

  const handleAdd = () => {
    if (isAreaProduct) {
      if (!length || !width) {
        return alert("Enter length & width");
      }
    } else {
      if (!qty || qty < 1) {
        return alert("Enter valid quantity");
      }
    }

    addToCart(product, {
      length: isAreaProduct ? Number(length) : null,
      width: isAreaProduct ? Number(width) : null,
      qty: isAreaProduct ? 1 : Number(qty),
      isAreaProduct,
      price: totalPrice
    });
  };

  return (
    <div className="card">
      <ImageSlider images={product.images} />

      <p className="badge">{product.type}</p>
      <h3>{product.name}</h3>

      {product.thickness && <p>Thickness: {product.thickness}</p>}

      <p>
        ₹{product.price_per_sqft} {isAreaProduct ? "/sqft" : "each"}
      </p>

      {/* AREA PRODUCTS */}
      {isAreaProduct ? (
        <>
          <input
            type="number"
            placeholder="Length (ft)"
            value={length}
            onChange={e => setLength(e.target.value)}
          />
          <input
            type="number"
            placeholder="Width (ft)"
            value={width}
            onChange={e => setWidth(e.target.value)}
          />
        </>
      ) : (
        <input
          type="number"
          min="1"
          value={qty}
          onChange={e => setQty(e.target.value)}
        />
      )}

      <p><b>Total: ₹{totalPrice || 0}</b></p>

      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}