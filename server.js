// backend/server.js

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import authRoutes from "./routes/authRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import prescriptionRoutes from './routes/prescriptionRoutes.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ➡️ Enable CORS for frontend requests
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// ➡️ Enable JSON body parsing
app.use(express.json());

// ➡️ Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// ➡️ Serve static prescription uploads folder
app.use('/uploads/prescriptions', express.static(path.join(__dirname, '/uploads/prescriptions')));

// ➡️ Database connection
mongoose.set("strictQuery", false); // Optional: suppress strictQuery deprecation warning
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ➡️ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
