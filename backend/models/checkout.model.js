import mongoose from "mongoose";

const checkout = new mongoose.Schema({

    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Checkout = mongoose.model('Checkout' ,checkout);

export default Checkout;

