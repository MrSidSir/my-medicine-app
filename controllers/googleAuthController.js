import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email, googleId, imageUrl } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({ message: "Missing required Google account data" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create user with googleId as password to satisfy model schema
      user = new User({
        name,
        email,
        password: googleId, // stores googleId as password (hashed by pre save hook)
        googleId,
        avatar: imageUrl,
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Google login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET || "mysecretkey", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.status(200).json({ message: "Token verified", decoded });
  });
};
