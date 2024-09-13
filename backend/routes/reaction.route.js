import express from 'express';
import { addReaction, customerviewrequirment, deletereaction, getAllReactions, onereaction, updaterequirment } from '../controllers/reaction.controller.js';


const router = express.Router();


router.post('/addReaction',addReaction)
router.get('/getAllReactions',getAllReactions);
router.get('/onereaction/:id',onereaction);
router.get('/customerviewrequirment/:email',customerviewrequirment);
router.put('/updaterequirment/:id',updaterequirment);
router.delete('/deletereaction/:id',deletereaction);


export default router ; 