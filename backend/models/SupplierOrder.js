import  mongoose from "mongoose";

const supplierOrderSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  deliverdate: {
    type: Date,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  
  orderName: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },
  
});

const SupplierOrder = mongoose.model('SupplierOrder', supplierOrderSchema);

export default SupplierOrder;