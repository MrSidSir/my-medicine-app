// backend/routes/prescriptionRoutes.js

import express from 'express';
import { uploadPrescription, handleUploadPrescription } from '../controllers/prescriptionController.js';

const router = express.Router();

router.post('/upload', uploadPrescription, handleUploadPrescription);

export default router;
