import React, { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function ProductCard({ product, addToCart }) {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);

  const totalPrice = length * width * product.price_per_sqft;

  return (
    <div className="card">
      <ImageSlider images={product.images} />

      {/* ✅ CATEGORY BADGE */}
      <p className="badge">{product.type}</p>

      <h3>{product.name}</h3>
      {product.thickness && <p>Thickness: {product.thickness}</p>}

      <p>₹{product.price_per_sqft}</p>

      {/* Show size inputs only for plywood/timber */}
      {(product.type === "Plywood" || product.type === "Timber" || product.type === "Door") && (
        <>
          <input type="number" placeholder="Length (ft)" onChange={e => setLength(e.target.value)} />
          <input type="number" placeholder="Width (ft)" onChange={e => setWidth(e.target.value)} />
          <p>Total: ₹{totalPrice}</p>
        </>
      )}

      <button onClick={() => addToCart(product, length, width, totalPrice)}>
        Add to Cart
      </button>
    </div>
  );
}