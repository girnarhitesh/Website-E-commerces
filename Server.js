import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // ✅ Enable CORS for frontend & Postman

// ✅ Test endpoint
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// ✅ Proxy route for products
app.get("/api/products", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);