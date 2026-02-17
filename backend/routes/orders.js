const router = require("express").Router();
const db = require("../db");
const adminAuth = require("../middleware/adminAuth");

// 🔒 ADMIN: GET ALL ORDERS
router.get("/", adminAuth, async (req, res) => {
  try {
    const [orders] = await db.query("SELECT * FROM orders ORDER BY id DESC");

    const [items] = await db.query(`
      SELECT oi.*, p.name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
    `);

    const result = orders.map(order => ({
      ...order,
      items: items.filter(i => i.order_id === order.id)
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUBLIC: PLACE ORDER
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
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ==============================
// 🔒 DELETE ORDER (Admin Only)
// ==============================
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const orderId = req.params.id;

    // delete order items first
    await db.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);

    // delete order
    await db.query("DELETE FROM orders WHERE id = ?", [orderId]);

    res.json({ message: "Order completed & removed" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
