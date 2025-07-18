// backend/routes/medicineRoutes.js

import express from 'express';
import {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
} from '../controllers/medicineController.js';

const router = express.Router();

router.get('/', getAllMedicines);
router.get('/:id', getMedicineById);
router.post('/create-medicine', createMedicine);
router.put('/edit/:id', updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;
