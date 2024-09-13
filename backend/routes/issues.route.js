import express from 'express';
import {  createIssue, customerview, deleteIssue, getAllIssues, oneIssue, updateIssue } from '../controllers/issues.controller.js';

const router = express.Router();



 
router.post('/create',createIssue);
router.get('/getAllIssues',getAllIssues);
router.get('/oneIssue/:id',oneIssue);
router.put('/updateIssue/:id',updateIssue);
router.delete('/deleteIssue/:id',deleteIssue);
router.get('/customerview/:email',customerview);

export default router;