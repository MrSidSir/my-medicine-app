import cloudinary from "../config/cloudinary.js";
import Medicine from "../models/Medicine.js";

export const createMedicine = async (req, res) => {
  try {
    const { name, category, price, description, manufacturer, expiryDate, dosage, stock, prescriptionRequired } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "medicines" });

    const newMedicine = new Medicine({
      name,
      imageUrl: result.secure_url,
      category,
      price,
      description,
      manufacturer,
      expiryDate,
      dosage,
      stock,
      prescriptionRequired
    });

    await newMedicine.save();
    res.status(201).json(newMedicine);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
