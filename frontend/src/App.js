import React, { useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import "./styles.css";

function App() {
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");

  return (
    <div className={dark ? "dark" : ""}>
      {/* Header */}
      <header style={headerStyle}>
        <h2>Plywood Shop</h2>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")}>Home</button>

          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>

          <button onClick={() => setPage("checkout")}>
            Checkout
          </button>

          <button onClick={() => setPage("admin")}>
            Admin
          </button>

          <button onClick={() => setDark(!dark)}>
            {dark ? "Light" : "Dark"} Mode
          </button>
        </div>
      </header>

      {/* Pages */}
      {page === "home" && <Home cart={cart} setCart={setCart} />}
      {page === "cart" && <Cart cart={cart} />}
      {page === "checkout" && <Checkout cart={cart} setCart={setCart} />}
      {page === "admin" && <AdminDashboard />}
    </div>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "#007bff",
  color: "white",
  borderRadius: "8px",
  marginBottom: "20px"
};

export default App;
