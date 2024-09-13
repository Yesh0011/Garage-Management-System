
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
    {
        username:{
            type:String,
           required:true,
            
        },
      
        date:{
            type: Date,
            required: true,
    
            default: Date.now
        },
        arrival_time:{
            type: Date,
            required: true,
    
            default: Date.now 
        },

        leave_time:{
            type: Date,
            required: true,
    
            default: Date.now 
        },
     
        day: {
            type: Number,
            required: true,
            default: 0,
           
        },

        perdaysalary: {
            type: Number,
            default: 0,
           
        },

        salary: {
            type:String,
        }
     
    },{timestamps: true}
);

const EmplooyeeMark = mongoose.model('EmplooyeeMark',attendanceSchema);

export default EmplooyeeMark;
