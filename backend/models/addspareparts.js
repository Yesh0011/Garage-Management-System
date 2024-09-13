import mongoose from "mongoose";

const addspareparts = new mongoose.Schema({

    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String, 
        required: true
      }



}, { timestamps: true });

const AddSpareParts = mongoose.model('AddSpareParts' ,addspareparts);

export default AddSpareParts;

