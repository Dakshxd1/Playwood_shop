import React, { useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import "./styles.css";

function App() {
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <header style={headerStyle}>
        <h2>Plywood Shop</h2>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("cart")}>Cart ({cart.length})</button>
          <button onClick={() => setPage("checkout")}>Checkout</button>
          <button onClick={() => setPage("admin")}>Admin</button>

          {/* ✅ NEW BUTTON */}
          <button onClick={() => setPage("orders")}>Orders</button>

          <button onClick={() => setDark(!dark)}>
            {dark ? "Light" : "Dark"} Mode
          </button>
        </div>
      </header>

      {page === "home" && <Home cart={cart} setCart={setCart} />}
      {page === "cart" && <Cart cart={cart} setCart={setCart} />}
      {page === "checkout" && <Checkout cart={cart} setCart={setCart} />}

      {/* Admin login protection */}
      {page === "admin" &&
        (isAdmin ? (
          <AdminDashboard isAdmin={isAdmin} />
        ) : (
          <AdminLogin setIsAdmin={setIsAdmin} />
        ))}

      {/* 🔒 Orders page only for admin */}
      {page === "orders" &&
        (isAdmin ? (
          <AdminOrders />
        ) : (
          <AdminLogin setIsAdmin={setIsAdmin} />
        ))}
    </div>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  background: "#5a3e2b",
  color: "white"
};

export default App;
