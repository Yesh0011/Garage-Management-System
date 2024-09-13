import  mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    ordername: {
        type: String,
        required: true,
        
    },
    
    brand:{
        type: String,
        requrired: true,
    },
    quantity:{
        type: Number,
        requrired: true,
    },
    model:{
        type: String,
        requrired: true,
    },
    description:{
        type: String,
        requrired: true,
    },

    deadline: {
        type: Date, 
        required: true,
      },

      status: {
        type: Boolean, 
        required: true,
    },




   

}, {timestamps: true});

const order = mongoose.model('Order', orderSchema);

export default order; 