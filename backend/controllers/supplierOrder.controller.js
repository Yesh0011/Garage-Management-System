import SupplierOrder from '../models/SupplierOrder.js';
import Order from '../models/order.model.js'; 


export const addSupplierOrder = async (req, res, next) => {
    try {
        const { supplierName, phoneNumber, email, deliverdate, price, orderName, quantity } = req.body;

        const newSupplierOrder = new SupplierOrder({
            supplierName,
            phoneNumber,
            email,
            deliverdate,
            price,
            orderName,
            quantity,
        });

        // Save the newSupplierOrder to the database
        await newSupplierOrder.save();

        return res.status(201).json(newSupplierOrder);
    } catch (error) {
        next(error);
    }
};
