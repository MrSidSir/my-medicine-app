// backend/controllers/prescriptionController.js

import path from 'path';
import multer from 'multer';

// ⚙️ Multer storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/prescriptions/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// ✅ Upload middleware
export const uploadPrescription = multer({ storage }).single('prescription');

// ➡️ Controller to handle upload
export const handleUploadPrescription = (req, res) => {
  if (req.file) {
    res.status(200).json({
      message: 'Prescription uploaded successfully',
      filePath: `/uploads/prescriptions/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
};
