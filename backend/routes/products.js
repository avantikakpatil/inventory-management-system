const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products");
        res.json(products.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add a product
router.post("/", async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        const newProduct = await pool.query(
            "INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *",
            [name, price, quantity]
        );
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
