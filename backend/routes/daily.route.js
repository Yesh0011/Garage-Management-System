import express from 'express';
import { createStatus, customerviewstatus, deleteStatus, getAllStatus, onestatus, updateStatus } from '../controllers/daily.controller.js';


const router = express.Router();

router.post('/createStatus',createStatus)
router.get('/getAllStatus',getAllStatus);
router.get('/onestatus/:id',onestatus);
router.put('/updateStatus/:id',updateStatus);
router.delete('/deleteStatus/:id',deleteStatus);
router.get('/customerviewstatus/:email',customerviewstatus);




export default router ; 