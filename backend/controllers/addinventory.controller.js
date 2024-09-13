
import Addinventory from '../models/addinventory.model.js';
import { errorHandler } from '../utils/error.js'; 

export const additem = async (req, res, next) => {
    console.log(req.body);
    try {
        const { category, name, brand, quantity, model } = req.body;
        const newAddInventory = await Addinventory.create({
            category,
            name,
            brand,
            quantity,
            model,
            
        });
        return res.status(201).json(newAddInventory);
    } catch (error) {
        next(error);
    }
};

export const getAllItems = async(req, res, next)=>{
    try{
        const items =  await Addinventory.find();

        res.status(200).json(items);

    }
    catch(error){
        next(error);
    }
};

export const deleteitem = async(req, res ,next)=> {
    const item = await Addinventory.findById(req.params.id);
    if(!item){
        return next(errorHandler(404, 'Not found'));

    }

    try{

        await Addinventory.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted');
    }
    catch(error){
        next(error);

    }
};

export const updateitem = async (req,res,next) => {

    const item = await Addinventory.findById(req.params.id);
    if(!item){
        return next(errorHandler(404, 'Not found'));

    }

    try{
        const { category, name, brand, quantity, model } = req.body;
        

        await Addinventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
    );
        res.status(200).json('Updated');
    }
    catch(error){
        next(error);

    }
}

export const getitem = async(req,res,next) =>{
    try {
        const item = await Addinventory.findById(req.params.id) ; 
        if (!item) {
            return next(errorHandler(404, 'Not found'));
        }
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};
    
export const getLowStockItems = async (req, res, next) => {
    try {
      const lowStockItems = await Addinventory.find({ quantity: { $lt: 15 } });
      res.status(200).json(lowStockItems);
    } catch (error) {
      next(error);
    }
  };