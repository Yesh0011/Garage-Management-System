import express from 'express';
import { getAllAppoiment, oneApoiment } from '../controllers/ap.controller.js';


const router = express.Router();


router.get('/getAllAppoiment',getAllAppoiment);
router.get('/oneApoiment/:id',oneApoiment);


export default router ; 
