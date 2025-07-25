import express from 'express';
import {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
} from '../controllers/medicineController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllMedicines);
router.get('/:id', getMedicineById);
router.post('/create-medicine', protect, admin, createMedicine);
router.put('/edit/:id', protect, admin, updateMedicine);
router.delete('/:id', protect, admin, deleteMedicine);

export default router;
