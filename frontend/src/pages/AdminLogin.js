import React, { useState } from "react";

export default function AdminLogin({ setIsAdmin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (phone === "9812879214" && password === "Anshu@123") {
      setIsAdmin(true);
      alert("Login successful");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "50px auto" }}>
      <h2>Admin Login</h2>

      <input
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
