import express from 'express';
import { createStatushistory, customerviewreport, getAllhistory } from '../controllers/statushistory.controller.js';


const router = express.Router();



router.post('/createStatushistory',createStatushistory)
router.get('/getAllhistory',getAllhistory);

router.get('/customerviewreport/:email',customerviewreport);





export default router ;