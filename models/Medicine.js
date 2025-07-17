import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  manufacturer: String,
  expiryDate: Date,
  batchNumber: String,
  dosage: String,
  stock: { type: Number, default: 0 },
  prescriptionRequired: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Medicine", medicineSchema);
