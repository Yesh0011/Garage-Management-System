import express from 'express';
import { payment, getAllPayment, deletePayment, onePayment, updatePayment} from '../controllers/payment.conyroller.js';

const router = express.Router();

router.post('/payment',payment)
router.get('/getAllPayment',getAllPayment)
router.delete('/deletePayment/:id',deletePayment);
router.get('/onePayment/:id',onePayment);
router.put('/updatePayment/:id',updatePayment);

export default router ; 
