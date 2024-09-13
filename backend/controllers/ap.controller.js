import appointment from "../models/ap.model.js";



export const getAllAppoiment = async (req , res , next) => {
    try{
 
       const issues = await appointment.find();
       res.status(200).json(issues);
 
 
    }catch (error){
       next(error);
    }
 };


 export const oneApoiment = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await appointment.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 
 
 };

 