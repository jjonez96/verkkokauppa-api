const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8000;
const cors = require("cors");
app.use(cors());
require("dotenv").config({ path: ".env" });

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error(err);
  }
}

connect();

// Define schema and model for each collection
const productSchema = new mongoose.Schema({}, { collection: "products" });
const customerSchema = new mongoose.Schema({}, { collection: "customers" });
const orderSchema = new mongoose.Schema({}, { collection: "orders" });

const Product = mongoose.model("Product", productSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to fetch data from products collection
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Limiting to 10 records for example

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch data from customers collection
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find(); // Limiting to 10 records for example

    if (customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch data from orders collection
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Limiting to 10 records for example

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
