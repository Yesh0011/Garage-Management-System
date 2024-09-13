import order from '../models/order.model.js';
import SupplierOrder from '../models/SupplierOrder.js';
import { errorHandler } from '../utils/error.js'; 

export const addorder = async (req, res, next) => {
    console.log(req.body);
    try {
        const { ordername, brand, quantity, model, description, deadline, status } = req.body;

        const newOrder = await order.create({
        ordername,
        brand,
        quantity,
        model,
        description,
        deadline, 
        status,
});
        return res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
};

export const pendingorders = async(req, res, next)=>{
    try{
        const orders =  await order.find();

        res.status(200).json(orders);

    }
    catch(error){
        next(error);
    }
};

export const acceptedorders = async(req, res, next)=>{
    try{
        const orders =  await order.find();

        res.status(200).json(orders);

    }
    catch(error){
        next(error);
    }
};

export const suplierorder = async(req, res, next)=>{
    try{
        const orders =  await order.find();

        res.status(200).json(orders);

    }
    catch(error){
        next(error);
    }
};

export const deleteorder = async (req, res, next) => {
    try {
      const deletedOrder = await order.findById(req.params.id); // Changed variable name from 'order' to 'deletedOrder'
      if (!deletedOrder) {
        return next(errorHandler(404, 'Order not found')); // Changed error message to 'Order not found'
      }
  
      await order.findByIdAndDelete(req.params.id);
      res.status(200).json('Deleted');
    } catch (error) {
      next(error);
    }
  };

  export const getorder = async(req,res,next) =>{
    try {
        const orderdetails = await order.findById(req.params.id) ; 
        if (!orderdetails) {
            return next(errorHandler(404, 'Not found'));
        }
        res.status(200).json(orderdetails);
    } catch (error) {
        next(error);
    }
};

  export const toacceptorder = async(req,res,next) =>{
    try {
        const orderdetails = await order.findById(req.params.id) ; 
        if (!orderdetails) {
            return next(errorHandler(404, 'Not found'));
        }
        res.status(200).json(orderdetails);
    } catch (error) {
        next(error);
    }
};



export const accept = async (req, res, next) => {
    console.log(req.body);
    try {
        const { ordername, brand, quantity, model, description, deadline, status } = req.body;

        const newOrder = await order.create({
        ordername,
        brand,
        quantity,
        model,
        description,
        deadline, 
        status,
});
        return res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  export const addSupplierOrder = async (req, res,next) => {
  try {
    const { supplierName, phoneNumber, email , deliverdate, price } = req.body;

    // Create a new supplier order instance
    const newSupplierOrder = new SupplierOrder({
      supplierName,
      phoneNumber,
      deliverdate,
      email,
      price,
    });return res.status(201).json(newSupplierOrder);
} catch (error) {
    next(error);
}
};