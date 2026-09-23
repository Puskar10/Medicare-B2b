import "dotenv/config";
import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

connectDB();

app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// HOME ROUTE
// ===============================
app.use("/api/auth", authRoutes);




app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CuraMed API is running",
  });
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(`CuraMed server running on port ${PORT}`);
  console.log(`Client URL: ${CLIENT_URL}`);
});
