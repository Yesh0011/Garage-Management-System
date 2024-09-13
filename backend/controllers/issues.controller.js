import Repair from "../models/issues.model.js";


export const createIssue = async (req , res , next) => {

   
   

   
   try {
   const newRepair = await Repair.create(req.body);

    return res.status(201).json(newRepair)

   }catch(error){
    next(error);
   }

};


export const getAllIssues = async (req , res , next) => {
   try{

      const issues = await Repair.find();
      res.status(200).json(issues);


   }catch (error){
      next(error);
   }
};

export const oneIssue = async (req , res , next) => {

   try{

      const id = req.params.id;
      const userExist = await Repair.findById(id);

      res.status(200).json(userExist);

   }catch(error){
      next(error);
   }


}

export const updateIssue = async(req , res , next) => {

   try{

      const id = req.params.id ;

      
 
      const updateData = await Repair.findByIdAndUpdate(id, req.body, {new:true});
      res.status(200).json(updateData);


   }catch( error){
      next(error);
   }
}


export const deleteIssue = async(req , res ,next) => {

   try{

      const id = req.params.id ;

      
 
       await Repair.findByIdAndDelete(id);
      res.status(200).json('Issue has been deleted');


   }catch( error){
      next(error);
   }
}


export const customerview = async(req,res,next) =>{

   try{

       const email = req.params.email;
       const user = await Repair.findOne({email});
       
       if(!user){
           return res.status(404).json("User not found!");
       }

       res.status(200).json(user);
 
    }catch(error){
       next(error);
    }

}