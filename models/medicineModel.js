import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Medicine name is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    prescriptionRequired: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
