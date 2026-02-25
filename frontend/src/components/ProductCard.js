import React, { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function ProductCard({ product, addToCart }) {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [qty, setQty] = useState(1);

  // Area-based products
  const isAreaProduct =
    product.type === "Plywood" ||
    product.type === "Timber" ||
    product.type === "Door";

  // Price calculation
  const totalPrice = isAreaProduct
    ? length * width * product.price_per_sqft
    : qty * product.price_per_sqft;

  return (
    <div className="card">
      <ImageSlider images={product.images} />

      <p className="badge">{product.type}</p>
      <h3>{product.name}</h3>

      {product.thickness && <p>Thickness: {product.thickness}</p>}

      <p>
        ₹{product.price_per_sqft} {isAreaProduct ? "/sqft" : "each"}
      </p>

      {/* AREA INPUTS */}
      {isAreaProduct ? (
        <>
          <input
            type="number"
            placeholder="Length (ft)"
            onChange={e => setLength(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Width (ft)"
            onChange={e => setWidth(Number(e.target.value))}
          />
        </>
      ) : (
        /* QUANTITY INPUT */
        <input
          type="number"
          min="1"
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
        />
      )}

      <p><b>Total: ₹{totalPrice}</b></p>

      <button
        onClick={() =>
          addToCart(product, {
            length,
            width,
            qty,
            price: totalPrice
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}