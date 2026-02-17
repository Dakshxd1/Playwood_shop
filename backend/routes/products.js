const router = require("express").Router();
const db = require("../db");

// ✅ GET all products
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
        // ✅ Use live host instead of localhost
        const fullUrl = `${req.protocol}://${req.get("host")}${row.image_url}`;
        products[row.id].images.push(fullUrl);
      }
    });

    res.json(Object.values(products));
  } catch (err) {
    console.error("Products API error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ ADD PRODUCT (FIX 404)
router.post("/", async (req, res) => {
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

module.exports = router;
