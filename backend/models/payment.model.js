import mongoose from "mongoose";

const payment = new mongoose.Schema({

    paymentId: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        // required: true
    }



}, { timestamps: true });

const Payment = mongoose.model('Payment' ,payment);

export default Payment;

