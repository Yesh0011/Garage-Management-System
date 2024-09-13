import Payment from "../models/payment.model.js";

export const payment = async (req ,res ,next) => {

    try{
        const newstatus = await Payment.create(req.body);
        return res.status(201).json(newstatus);

    }catch(error){
        next(error);
    }
};

export const getAllPayment = async (req , res , next) => {
    try{
 
       const issues = await Payment.find();
       res.status(200).json(issues);
 
    }catch (error){
       next(error);
    }
 };

 export const deletePayment = async(req , res ,next) => {

    try{
 
       const id = req.params.id ;
 
        await Payment.findByIdAndDelete(id);
       res.status(200).json('Deleted Successfull');
 
    }catch( error){
       next(error);
    }
 };

 export const onePayment = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await Payment.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 
 
 };

 export const updatePayment = async(req , res , next) => {

   try{

      const id = req.params.id ;

      const updateData = await Payment.findByIdAndUpdate(id, req.body, {new:true});
      res.status(200).json(updateData);

   }catch( error){
      next(error);
   }
};
