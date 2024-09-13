import express from 'express';
import { checkout, getAllBuyer, deleteCheckout, oneBuyer, updateBuyer } from '../controllers/checkout.controller.js';

const router = express.Router();

router.post('/checkout',checkout)
router.get('/getAllBuyer',getAllBuyer);
router.delete('/deleteCheckout/:id',deleteCheckout);
router.get('/oneBuyer/:id',oneBuyer);
router.put('/updateBuyer/:id',updateBuyer);

export default router ; 
