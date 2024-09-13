import AddSpareParts from "../models/addspareparts.js";

export const addparts = async (req ,res ,next) => {

    
    try{
        const newstatus = await AddSpareParts.create(req.body);
        return res.status(201).json(newstatus);

    }catch(error){
        next(error);
    }
};
export const getAllSpareParts = async (req , res , next) => {
    try{
 
       const issues = await AddSpareParts.find();
       res.status(200).json(issues);
 
    }catch (error){
       next(error);
    }
 };

 export const oneSpareParts = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await AddSpareParts.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 

 };