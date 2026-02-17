const router = require("express").Router();
const multer = require("multer");
const db = require("../db");
const path = require("path");
const fs = require("fs");

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);   // absolute path
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanName = Date.now() + ext;
    cb(null, cleanName);
  }
});

const upload = multer({ storage });

// ✅ Upload multiple images
router.post("/:productId", upload.array("images", 4), async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    for (const file of req.files) {
      await db.query(
        "INSERT INTO product_images (product_id, image_url) VALUES (?, ?)",
        [productId, `/uploads/${file.filename}`]
      );
    }

    res.json({ message: "Images uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
