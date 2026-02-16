import React, { useState } from "react";
import "./slider.css";

export default function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return <p>No image</p>;

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="slider">
      <img src={images[index]} alt="" className="slider-image" />

      {/* Arrows */}
      <button className="nav left" onClick={prev}>❮</button>
      <button className="nav right" onClick={next}>❯</button>

      {/* Dots */}
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
