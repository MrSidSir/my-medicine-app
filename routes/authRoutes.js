import express from "express";
import { registerUser, authUser } from "../controllers/authController.js";
import { googleAuth, verifyToken } from "../controllers/googleAuthController.js";

const router = express.Router();

// Input validation middleware
const validateRegisterInput = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: "Name must be at least 2 characters long" });
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }
  
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }
  
  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  
  next();
};

// Routes
router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, authUser);
router.post("/google", googleAuth);
router.get("/verify", verifyToken);

export default router;