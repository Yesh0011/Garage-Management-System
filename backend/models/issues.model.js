import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({


    email: {
        type: String,
        required: true,
    },

    vehiclenumber: {
        type: String,
        required: true,
        unique: true,
    },

    vehicle: {
        type: String,
        default : "https://media.istockphoto.com/id/1157763394/vector/motor-vehicles-automobile-bus-truck-flat-vector-pictogram-icon-set.jpg?s=612x612&w=0&k=20&c=qV_inSmXdftbufcMH3LUL0u1doNBKjqIJEBrApyu5MQ=",
    },
    engine: {
        type: String,
        default: "good"
        
    },
    tyre: {
        type: String,
        default: "good"
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
    requirment: {
        type: Array,
        default: "No requirment"
        
    },
    date: {
        type: Date,
        required: true,

        default: Date.now
    }
    


}, { timestamps: true });

const Repair = mongoose.model('Repair', repairSchema);
  
export default Repair;