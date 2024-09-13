import Checkout from "../models/checkout.model.js";

export const checkout = async (req ,res ,next) => {

    try{
        const newstatus = await Checkout.create(req.body);
        return res.status(201).json(newstatus);

    }catch(error){
        next(error);
    }
};

export const getAllBuyer = async (req , res , next) => {
    try{
 
       const issues = await Checkout.find();
       res.status(200).json(issues);
 
    }catch (error){
       next(error);
    }
 };

 export const deleteCheckout = async(req , res ,next) => {

    try{
 
       const id = req.params.id ;
 
        await Checkout.findByIdAndDelete(id);
       res.status(200).json('Issue has been deleted');
 
    }catch( error){
       next(error);
    }
 };

 export const oneBuyer = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await Checkout.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 

 };

 export const updateBuyer = async(req , res , next) => {

   try{

      const id = req.params.id ;

      const updateData = await Checkout.findByIdAndUpdate(id, req.body, {new:true});
      res.status(200).json(updateData);

   }catch( error){
      next(error);
   }
};
