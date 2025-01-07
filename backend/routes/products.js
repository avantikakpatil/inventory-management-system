const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const pool = require("../db/db");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Upload and store Excel data with verification
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Parse the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Check if the sheetData is empty
        if (sheetData.length === 0) {
            return res.status(400).json({ message: "No data found in the uploaded file." });
        }

        // Process each row in the Excel file
        for (const row of sheetData) {
            const { name, price, quantity } = row;

            // Check if all required fields are present
            if (!name || !price || !quantity) {
                continue; // Skip the row if it's incomplete
            }

            // Check if the product already exists in the database
            const existingProduct = await pool.query(
                "SELECT * FROM products WHERE name = $1",
                [name]
            );

            if (existingProduct.rowCount > 0) {
                // If the product exists, update it and mark it as verified
                await pool.query(
                    "UPDATE products SET price = $1, quantity = $2, verified = true WHERE name = $3",
                    [price, quantity, name]
                );
            } else {
                // If the product doesn't exist, insert it
                await pool.query(
                    "INSERT INTO products (name, price, quantity, verified) VALUES ($1, $2, $3, $4)",
                    [name, price, quantity, true]
                );
            }
        }

        res.json({ message: "Data successfully processed and stored in the database." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while processing the file." });
    }
});

module.exports = router;
