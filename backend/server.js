const express = require("express");
const cors = require("cors");
const path = require("path");
const productsRoute = require("./routes/products");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving (for React frontend)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/products", productsRoute);

app.get('/api/products/verified', (req, res) => {
  // Logic to fetch verified products
  const verifiedProducts = db.query("SELECT * FROM products WHERE verified = true");
  res.json(verifiedProducts);
});


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
