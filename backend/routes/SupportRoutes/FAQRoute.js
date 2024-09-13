import express from 'express';
import { faq } from '../../models/SupportModels/FAQModel.js';

const router = express.Router();

//Route for save a new FAQ
router.post('/addFaq', async (request, response) => {
    try{
        if(
            !request.body.Question ||
            !request.body.Answer 
        ) {
            return response.status(400).send({
                message: 'Send all required feilds: Email, Descrption, Rating',
            });
        }
        const newFaq = {
            Question: request.body.Question,
            Answer: request.body.Answer,
        };

        const createdFaq =await faq.create(newFaq);
        return response.status(201).send(createdFaq);
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Route for Get All FAQs from database
router.get('/getFaqs', async (request, response) => {
    try {
        const allFAQ = await faq.find({});

        return response.status(200).json({
            count: allFAQ.length,
            data:allFAQ
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get one Feedbacks from database by id
router.get('/getFaq/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const createdFaq = await faq.findById(id);

        return response.status(200).json(createdFaq);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for update a feedback
router.put('/editFaq/:id', async (request, response) => {
    try{
        if(
            !request.body.Question ||
            !request.body.Answer 
        ){
            return response.status(400).send({
                message: 'Send all required feilds: Question, Answer',
            });
        }

        const { id } = request.params;

        const result = await faq.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'FAQ not found' });
        }

        return response.status(200).send({ message: 'FAQ updated successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Routee for delete a feedback
router.delete('/deleteFaq/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const result = await faq.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'FAQ not found' });
        }

        return response.status(200).send({ message: 'FAQ deleted successfully'});

    }catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
