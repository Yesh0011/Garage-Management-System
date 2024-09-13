import express from 'express';

import { addorder , pendingorders , deleteorder , getorder , acceptedorders , suplierorder , toacceptorder , accept , getAllOrders , addSupplierOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/addorder', addorder);
router.get('/pendingorders', pendingorders);
router.delete('/delete/:id', deleteorder);
router.get('/get/:id', getorder);
router.get('/acceptedorders', acceptedorders);

router.get('/toacceptorder/:id', toacceptorder);
router.get('/accept/:id', accept);
router.get('/orders', getAllOrders);

router.get('/suplierorder', suplierorder);
router.post('/acceptform', addSupplierOrder);




export default router;