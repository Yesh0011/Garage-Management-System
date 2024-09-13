import express from 'express';
import { sentEmail } from '../controllers/email.controller.js';


const router = express.Router();

// Route to send email
router.post('/sentEmail',sentEmail)

export default router ; 