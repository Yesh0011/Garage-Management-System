import mongoose from "mongoose";

const statushistroySchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    vehiclenumber: {
        type: String,
        required: true,
        
    },

    details: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
        
    }



}, { timestamps: true });

const StatusHistory = mongoose.model('StatusHistory' ,statushistroySchema);

export default StatusHistory;

