import express from "express";
import { createMedicine, getAllMedicines, getMedicineById } from "../controllers/medicineController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
router.post("/", protect, admin, upload.single("image"), createMedicine);

export default router;
