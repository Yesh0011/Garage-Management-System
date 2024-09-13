import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
    {
        Email:{
            type: String,
            required: true,
        },
        Description:{
            type: String,
            required: true,
            unique: true,
        },
        Rating:{
            type: Number,
            required: true,
            default: 0
        },

      

    },
    {
        timestamps: true,
    }
);

export const feedback = mongoose.model('feedback',feedbackSchema);
