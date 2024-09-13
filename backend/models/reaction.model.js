import mongoose from "mongoose";
 
const requirmentsSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    vehiclenumber: {
        type: String,
        required: true,
        unique: true,
    },

    engine: {
        type: String,
        default: "No check engine"
        
    },
    tyre: {
        type: String,
        default: "No  add tyre"
    },

    parts: {
        type: String,
        default: "No parts required"
        
    },

    approvel: {
        type: String,
        required: true,
        default: "Yes"

        
    },
    additional: {
        type: String,
        default: "No Additinal"
        
    },
    rdate: {
        type: Date,
        required: true,

        default: Date.now
    },
    time : {
        type: Date,
        required: true,

        default: Date.now
    },
    update : {
        type :Boolean,
        default : false
    },


},{ timestamps: true });

const Requirments = mongoose.model('Requirments', requirmentsSchema);

export default Requirments;
