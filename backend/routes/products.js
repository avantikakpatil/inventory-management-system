const express = require("express");
const pool = require("../db/db");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  console.log("Received request to /api/products");
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    res.json(result.rows); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});

// Fetch verified products
router.get("/verified", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE verified = true ORDER BY created_at DESC"
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No verified products found." });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while fetching verified products." });
  }
});

router.patch("/:id/location", async (req, res) => {
  console.log("Updating location for product ID:", req.params.id);  // Add logging here
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const result = await pool.query(
      "UPDATE products SET location = $1 WHERE id = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json({ message: "Location updated successfully.", product: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while updating location." });
  }
});

// Verify product by ID
router.patch("/:id/verify", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    const result = await pool.query(
      "UPDATE products SET verified = true WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json({ message: "Product verified successfully.", product: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while verifying the product." });
  }
});

module.exports = router;
