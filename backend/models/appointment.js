import mongoose from "mongoose";

const apppointmentSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    absent: {
        type: Boolean,
        required: true
    },
    see: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const applist = mongoose.model('applist' ,apppointmentSchema);

export default applist;

