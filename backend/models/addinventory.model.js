import  mongoose from "mongoose";

const addinventorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Tools', 'Oils', 'Safety', 'Paints','Spareparts'] ,
    },
    name:{
        type: String,
        requrired: true,
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
   

}, {timestamps: true});

const Addinventory = mongoose.model('Addinventory', addinventorySchema);

export default Addinventory; 