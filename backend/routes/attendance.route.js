import express from 'express';
import { createAttendence, deleteattendence, getAllAttendance, markAttendence, oneAttent, setleave } from '../controllers/attendance.controller.js';

const router = express.Router();


router.post('/createAttendence', createAttendence);
router.get("/getAllAttendance",getAllAttendance);
router.get("/markAttendence/:username",markAttendence);
router.get("/oneAttent/:id",oneAttent);

router.put("/setleave/:id",setleave);
router.delete("/deleteattendence/:id",deleteattendence);



export default router;
