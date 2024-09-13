
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
    {
        username:{
            type:String,
           required:true,
            
        },
      
        date:{
            type: Date,
            // required: true,
    
             default: Date.now
        },
        arrival_time:{
            type: Date,
            //required: true,
    
            default: Date.now // Changed type from Time to Date
        },

        leave_time:{
            type: Date,
           // required: true,
    
            default: Date.now // Changed type from Time to Date
        },
     
     
    },{timestamps: true}
);

const NewAttendance = mongoose.model('NewAttendance',attendanceSchema);

export default NewAttendance;
