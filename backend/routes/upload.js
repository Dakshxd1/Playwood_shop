const router = require("express").Router();
const multer = require("multer");
const db = require("../db");
const path = require("path");

// ✅ Clean filename storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanName = Date.now() + ext;   // ✅ no spaces
    cb(null, cleanName);
  }
});

const upload = multer({ storage });

// ✅ Upload multiple images
router.post("/:productId", upload.array("images", 4), async (req, res) => {
  try {
    const productId = req.params.productId;

    for (const file of req.files) {
      await db.query(
        "INSERT INTO product_images (product_id, image_url) VALUES (?, ?)",
        [productId, `/uploads/${file.filename}`]
      );
    }

    res.json({ message: "Images uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
