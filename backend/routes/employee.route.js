import express from 'express';
import { EmployeeAdd, deleteEmpsalary, getAllemp, oneaddEmp, updateEmpsalary, updategetEmp } from '../controllers/employee.controller.js';

const router = express.Router();


router.post('/EmployeeAdd', EmployeeAdd);
router.get('/getAllemp', getAllemp);
router.get('/oneaddEmp/:id', oneaddEmp);
router.put('/updategetEmp/:id', updategetEmp);
router.put('/updateEmpsalary/:id', updateEmpsalary);
router.delete('/deleteEmpsalary/:id', deleteEmpsalary);


export default router;
