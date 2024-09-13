import Requirments from "../models/reaction.model.js";

export const addReaction = async (req ,res ,next) => {

    
    try{
        const newreaction = await Requirments.create(req.body);
        return res.status(201).json(newreaction);

    }catch(error){
        next(error);
    }
};


export const getAllReactions = async (req , res , next) => {
    try{
 
       const issues = await Requirments.find();
       res.status(200).json(issues);
 
 
    }catch (error){
       next(error);
    }
 };

 export const onereaction = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await Requirments.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 
 
 };

 export const customerviewrequirment = async(req,res,next) =>{

   try{

       const email = req.params.email;
       const user = await Requirments.findOne({email});
       
       if(!user){
           return res.status(404).json("User not found!");
       }

       res.status(200).json(user);
 
    }catch(error){
       next(error);
    }

}


//  export const updaterequirment = async(req , res , next) => {



//    try{

//       const id = req.params.id ;

      
 
//       const updateData = await Requirments.findByIdAndUpdate(id, req.body, {new:true});
//       res.status(200).json(updateData);


//    }catch( error){
//       next(error);
//    }

          



// }



// export const updaterequirment = async (req, res, next) => {
//    const update = req.body.update; 
 
//    try {
//      if (update === true) {
//        res.status(200).json({ message: 'You can not update' });
//      } else { 
//        const id = req.params.id;
//        const updateData = await Requirments.findByIdAndUpdate(id, req.body, { new: true });
//        res.status(200).json(updateData);

       
//      }
//    } catch (error) {
//      next(error);
//    }
//  };
 

export const updaterequirment = async (req, res, next) => {
   try {
       const id = req.params.id;

       const requirment = await Requirments.findById(id);
       if (!requirment) {
           return res.status(404).json({ message: 'Employee not found' });
       }

       if(requirment.update === false){

         requirment.tyre = req.body.tyre;
         requirment.parts = req.body.parts;
         requirment.approvel = req.body.approvel;
         requirment.rdate = req.body.rdate;
         requirment.time = req.body.time;
         requirment.additional = req.body.additional;
       }
       
         requirment.update = true;

       const { update } = req.body;

       

       const updatedrequirment = await requirment.save();
       
       res.status(200).json(updatedrequirment);
   } catch (error) {
       next(error);
    }
};

export const deletereaction = async(req , res ,next) => {

    try{
 
       const id = req.params.id ;
 
       
  
        await Requirments.findByIdAndDelete(id);
       res.status(200).json('Reaction has been deleted');
 
 
    }catch( error){
       next(error);
    }
 }
 