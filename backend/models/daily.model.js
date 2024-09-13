import mongoose from "mongoose";

const dailystatusSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    vehiclenumber: {
        type: String,
        required: true,
        unique: true,
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

const Dailystatus = mongoose.model('Dailystatus' ,dailystatusSchema);

export default Dailystatus;

