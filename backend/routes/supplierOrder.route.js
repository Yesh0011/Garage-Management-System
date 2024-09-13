import express from 'express';
import { addSupplierOrder } from '../controllers/supplierOrder.controller.js';

const router = express.Router();

// Endpoint for adding a new supplier order
router.post('/addordersupplier', addSupplierOrder);

export default router;