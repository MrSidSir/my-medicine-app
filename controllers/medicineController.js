// backend/controllers/medicineController.js

import Medicine from '../models/medicineModel.js';

// ➡️ GET all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error.message);
    res.status(500).json({ message: "Server error fetching medicines" });
  }
};

// ➡️ GET medicine by ID
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (medicine) {
      res.json(medicine);
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (error) {
    console.error("Error fetching medicine by ID:", error.message);
    res.status(500).json({ message: "Server error fetching medicine by ID" });
  }
};

// ➡️ POST create new medicine
export const createMedicine = async (req, res) => {
  try {
    const { name, category, price, description, countInStock, manufacturer, prescriptionRequired } = req.body;

    // Basic validation
    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const medicine = new Medicine({
      name,
      category,
      price,
      description,
      countInStock,
      manufacturer,
      prescriptionRequired
    });

    const createdMedicine = await medicine.save();
    res.status(201).json(createdMedicine);
  } catch (error) {
    console.error("Error creating medicine:", error.message);
    res.status(500).json({ message: "Server error creating medicine" });
  }
};

// ➡️ PUT update medicine
export const updateMedicine = async (req, res) => {
  try {
    const { name, category, price, description, countInStock, manufacturer, prescriptionRequired } = req.body;

    const medicine = await Medicine.findById(req.params.id);

    if (medicine) {
      medicine.name = name || medicine.name;
      medicine.category = category || medicine.category;
      medicine.price = price || medicine.price;
      medicine.description = description || medicine.description;
      medicine.countInStock = countInStock || medicine.countInStock;
      medicine.manufacturer = manufacturer || medicine.manufacturer;
      medicine.prescriptionRequired = prescriptionRequired !== undefined ? prescriptionRequired : medicine.prescriptionRequired;

      const updatedMedicine = await medicine.save();
      res.json(updatedMedicine);
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (error) {
    console.error("Error updating medicine:", error.message);
    res.status(500).json({ message: "Server error updating medicine" });
  }
};

// ➡️ DELETE medicine
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (medicine) {
      await medicine.remove();
      res.json({ message: 'Medicine removed' });
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (error) {
    console.error("Error deleting medicine:", error.message);
    res.status(500).json({ message: "Server error deleting medicine" });
  }
};
