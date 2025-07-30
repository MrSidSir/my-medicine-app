// backend/controllers/medicineController.js

import Medicine from "../models/Medicine.js";

// @desc    Create a new medicine
// @route   POST /api/medicines
export const createMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all medicines
// @route   GET /api/medicines
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single medicine by ID
// @route   GET /api/medicines/:id
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a medicine
// @route   PUT /api/medicines/:id
export const updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a medicine
// @route   DELETE /api/medicines/:id
export const deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
