const router = require("express").Router();
const db = require("../db");

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
        products[row.id].images.push(
          `http://localhost:5002${row.image_url}`
        );
      }
    });

    res.json(Object.values(products));
  } catch (err) {
    console.error("Products API error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
