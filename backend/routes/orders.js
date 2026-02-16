const router = require("express").Router();
const db = require("../db");

// ✅ Get all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.*, oi.product_id, oi.length, oi.width, oi.quantity, oi.total_price
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
    `);

    res.json(rows);
  } catch (err) {
    console.error("Orders fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Place order
router.post("/", async (req, res) => {
  try {
    const { customer_name, phone, address, items } = req.body;

    const [orderResult] = await db.query(
      "INSERT INTO orders (customer_name, phone, address) VALUES (?, ?, ?)",
      [customer_name, phone, address]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.query(
        `INSERT INTO order_items
         (order_id, product_id, length, width, quantity, total_price)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.product_id,
          item.length,
          item.width,
          item.quantity,
          item.total_price
        ]
      );
    }

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
