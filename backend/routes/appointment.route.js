import express from 'express';
import { appoitmentHistory, createAppointment, deleteAppointment, garageManager, oneAppointment, updateAppointment, updateabsent, updatecomplte, userProfile,   } from '../controllers/appointment.js';


const router = express.Router();


router.post('/createAppointment',createAppointment)
router.get('/appoitmentHistory',appoitmentHistory)
router.get('/oneAppointment/:id', oneAppointment)
router.put('/updateAppointment/:id', updateAppointment)
router.delete('/deleteAppointment/:id',deleteAppointment);

router.get('/garageManager',garageManager)
router.put('/updatecomplte/:id',updatecomplte)
router.put('/updatecomplte/:id',updatecomplte)
router.put('/updateabsent/:id',updateabsent)

router.get('/userProfile/:id', userProfile)


export default router ; 