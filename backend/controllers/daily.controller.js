import Dailystatus from "../models/daily.model.js";

export const createStatus = async (req ,res ,next) => {

    
    try{
        const newstatus = await Dailystatus.create(req.body);
        return res.status(201).json(newstatus);

    }catch(error){
        next(error);
    }
};

export const getAllStatus = async (req , res , next) => {
    try{
 
       const issues = await Dailystatus.find();
       res.status(200).json(issues);
 
 
    }catch (error){
       next(error);
    }
 };


 export const onestatus = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await Dailystatus.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 
 
 };

 export const updateStatus = async(req , res , next) => {

   try{

      const id = req.params.id ;

      
 
      const updateData = await Dailystatus.findByIdAndUpdate(id, req.body, {new:true});
      res.status(200).json(updateData);


   }catch( error){
      next(error);
   }
}

export const deleteStatus = async(req , res ,next) => {

   try{

      const id = req.params.id ;

      
 
       await Dailystatus.findByIdAndDelete(id);
      res.status(200).json('Issue has been deleted');


   }catch( error){
      next(error);
   }
};

export const customerviewstatus = async(req,res,next) =>{

   try{

       const email = req.params.email;
       const user = await Dailystatus.findOne({email});
       
       if(!user){
           return res.status(404).json("User not found!");
       }

       res.status(200).json(user);
 
    }catch(error){
       next(error);
    }

};