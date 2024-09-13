import express from 'express';
import { additem ,getAllItems , deleteitem ,updateitem ,getitem ,getLowStockItems } from '../controllers/addinventory.controller.js';

const router = express.Router();

router.post('/additem', additem);
router.get('/items', getAllItems);
router.delete('/delete/:id', deleteitem);
router.post('/update/:id', updateitem);
router.get('/get/:id', getitem);
router.get('/lowstock', getLowStockItems);

export default router;