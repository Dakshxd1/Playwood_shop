const router = require("express").Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const db = require("../db");

// ✅ Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "plywood-shop",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// ✅ Upload images to Cloudinary
router.post("/:productId", upload.array("images", 4), async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    for (const file of req.files) {
      // Cloudinary URL is in file.path
      await db.query(
        "INSERT INTO product_images (product_id, image_url) VALUES (?, ?)",
        [productId, file.path]
      );
    }

    res.json({ message: "Images uploaded to Cloudinary" });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
