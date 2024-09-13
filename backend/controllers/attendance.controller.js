import NewAttendance from "../models/attendance.model.js";



// export const create =async(req,res)=>{
//     try{
//             const eattendanceData = new EAttendance(req.body);
//             if(!eattendanceData){
//                 return res.status(404).json({msg:"Attendance data not found"});
//             }
    
//             const savedEAttendance = await eattendanceData.save();
//             res.status(200).json(savedEAttendance);
    
//         }catch(error){
//             res.status(500).json({error:error});
//         }
    
    
// }

export const createAttendence = async (req ,res ,next) => {

    
    try{
        const newattendence = await NewAttendance.create(req.body);
        return res.status(201).json(newattendence);

    }catch(error){
        next(error);
    }
};

export const getAllAttendance = async (req ,res) => {

    try{

       const eattendanceData = await NewAttendance.find();
       if(!eattendanceData){
        return res.status(404).json({msg:"Attendance data not found"});
       }

      res.status(200).json(eattendanceData);

    }catch(error){

        res.status(500).json({error:error});
    }

}


export const markAttendence = async(req ,res , next) => {

    try{

        const username = req.params.username;
        const user = await NewAttendance.findOne({username});
        
        if(!user) {
            return res.status(404).json("User not found!");
        }

        res.status(200).json(user);

    }catch(error){
        next(error);
    }
}

export const oneAttent = async (req , res , next) => {
    try{

        const id = req.params.id;

        const user = await NewAttendance.findById(id)
        res.status(200).json(user)
    }catch(error){

        next(error);
    }
}

export const setleave =async(req,res,next) => {

        try{
            const id = req.params.id ;

            const update = await NewAttendance.findByIdAndUpdate(id , req.body, {new:true});
            res.status(200).json(update);
        
        }catch(error){
            next(error);
        }

}

export const deleteattendence = async(req , res ,next) => {

    try{
 
       const id = req.params.id ;
 
       
  
        await NewAttendance.findByIdAndDelete(id);
       res.status(200).json('Attendence has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };
