const router = require("express").Router();
const db = require("../db");
const adminAuth = require("../middleware/adminAuth");

// ==============================
// ✅ GET ALL PRODUCTS (Public)
// ==============================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, pi.image_url
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
    `);

    const products = {};

    rows.forEach(row => {
      if (!products[row.id]) {
        products[row.id] = {
          id: row.id,
          name: row.name,
          type: row.type,
          thickness: row.thickness,
          price_per_sqft: row.price_per_sqft,
          description: row.description,
          images: []
        };
      }

      if (row.image_url) {
        if (row.image_url.startsWith("http")) {
          products[row.id].images.push(row.image_url);
        } else {
          const fullUrl = `${req.protocol}://${req.get("host")}${row.image_url}`;
          products[row.id].images.push(fullUrl);
        }
      }      
    });

    res.json(Object.values(products));
  } catch (err) {
    console.error("Products API error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ==============================
// 🔒 ADD PRODUCT (Admin Only)
// ==============================
router.post("/", adminAuth, async (req, res) => {
  try {
    const { name, type, thickness, price_per_sqft, description } = req.body;

    const [result] = await db.query(
      `INSERT INTO products (name, type, thickness, price_per_sqft, description)
       VALUES (?, ?, ?, ?, ?)`,
      [name, type, thickness, price_per_sqft, description]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ==============================
// 🔒 DELETE PRODUCT (Admin Only)
// ==============================
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const id = req.params.id;

    // delete images first
    await db.query("DELETE FROM product_images WHERE product_id = ?", [id]);

    // delete product
    await db.query("DELETE FROM products WHERE id = ?", [id]);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
