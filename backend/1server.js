import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mal3020";
const client = new MongoClient(MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    console.log("📍 MongoDB URI:", MONGO_URI);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}

connectDB();

// Test API (handshake)
app.get("/api/handshake", async (req, res) => {
  try {
    const db = client.db("mal3020");
    const users = db.collection("users");
    const sampleUser = await users.findOne();
    res.json({
      message: "Hello from backend 👋",
      dbStatus: sampleUser ? "DB Connected" : "No user found",
      mongoUri: MONGO_URI.replace(/\/\/.*@/, "//*****@"), // Hide credentials
    });
  } catch (error) {
    res.status(500).json({
      message: "Error connecting to DB",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => res.send("Hello from backend!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});