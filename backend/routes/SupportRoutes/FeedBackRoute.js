import express from 'express';
import { feedback } from '../../models/SupportModels/FeedBackModel.js';

const router = express.Router();

//Route for save a new feedback
router.post('/addFeedback', async (request, response) => {
    try{
        if(
            !request.body.Email ||
            !request.body.Description ||
            !request.body.Rating 
        ) {
            return response.status(400).send({
                message: 'Send all required feilds: Email, Descrption, Rating',
            });
        }
        const newFeedback = {
            Email: request.body.Email,
            Description: request.body.Description,
            Rating: request.body.Rating
        };

        const createdFeedback =await feedback.create(newFeedback);
        return response.status(201).send(createdFeedback);
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Route for Get All Feedbacks from database
router.get('/getFeedbacks', async (request, response) => {
    try {
        const allFeedback = await feedback.find({});

        return response.status(200).json({
            count: allFeedback.length,
            data:allFeedback
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get one Feedbacks from database by id
router.get('/getFeedback/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const createdFeedback = await feedback.findById(id);

        return response.status(200).json(createdFeedback);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for update a feedback
router.put('/editFeedback/:id', async (request, response) => {
    try{
        if(
            !request.body.Email ||
            !request.body.Description ||
            !request.body.Rating 
        ){
            return response.status(400).send({
                message: 'Send all required feilds: Email, Descrption, Rating',
            });
        }

        const { id } = request.params;

        const result = await feedback.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'Feedback not found' });
        }

        return response.status(200).send({ message: 'Feedback updated successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Routee for delete a feedback
router.delete('/deleteFeedback/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const result = await feedback.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'Feedback not found' });
        }

        return response.status(200).send({ message: 'Feedback deleted successfully'});

    }catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
