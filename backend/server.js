const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // ✅ import database

const app = express();

app.use(cors());
app.use(express.json());

// ✅ serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

// ✅ AUTO CREATE TABLES IN RAILWAY
async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        type VARCHAR(50),
        thickness VARCHAR(20),
        price_per_sqft DECIMAL(10,2),
        description TEXT
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        image_url TEXT
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100),
        phone VARCHAR(15),
        address TEXT
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        length DECIMAL(10,2),
        width DECIMAL(10,2),
        quantity INT,
        total_price DECIMAL(10,2)
      )
    `);

    await db.query(`
        INSERT INTO products (name, type, thickness, price_per_sqft, description)
        VALUES ('Marine Plywood', 'Plywood', '18mm', 95, 'Waterproof plywood')
      `);
      

    console.log("✅ Tables ensured in Railway DB");
  } catch (err) {
    console.error("❌ Table creation error:", err);
  }
}

// Run table creation
createTables();

// Routes
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/upload", require("./routes/upload"));

// ✅ Use Render PORT
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
