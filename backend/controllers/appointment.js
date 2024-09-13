import applist from "../models/appointment.js";

//create appointment
export const createAppointment = async (req ,res ,next) => {

    
    try{
        const newstatus = await applist.create(req.body);
        return res.status(201).json(newstatus);

    }catch(error){
        next(error);
    }
};

//fetch to history page(get all)
export const appoitmentHistory = async (req , res , next) => {
    try{
 
       const issues = await applist.find();
       res.status(200).json(issues);
 
 
    }catch (error){
       next(error);
    }
 };


 //bring data to update page
 export const oneAppointment = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await applist.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 };


 //update appointment
 export const updateAppointment = async(req , res , next) => {

   try{

      const id = req.params.id ;
 
      const updateData = await applist.findByIdAndUpdate(id, req.body, {new:true});
      res.status(200).json(updateData);


   }catch( error){
      next(error);
   }
}


 //delete data from appoinemthistory page
 export const deleteAppointment = async(req , res ,next) => {

   try{

      const id = req.params.id ;

       await applist.findByIdAndDelete(id);
      res.status(200).json('Issue has been deleted');


   }catch( error){
      next(error);
   }
};


//get all to admin page
export const garageManager = async (req , res , next) => {
   try{

      const issues = await applist.find();
      res.status(200).json(issues);


   }catch (error){
      next(error);
   }
};


// Update appointment as completed
export const updateAppointmentCompleted = async (req, res, next) => {
   try {
       const id = req.params.id;

       // Find the appointment by ID
       const appointment = await applist.findById(id);

       // Check if the appointment exists
       if (!appointment) {
           return res.status(404).json({ message: "Appointment not found" });
       }

       // Update the completed field to true
       appointment.completed = true;

       // Save the updated appointment
       const updatedAppointment = await appointment.save();

       res.status(200).json(updatedAppointment);
   } catch (error) {
       next(error);
   }
}


//completed state
export const updatecomplte = async (req, res, next) => {
   try {
       const id = req.params.id;

       const requirment = await applist.findById(id);
       
         requirment.completed = true;
       const { completed } = req.body;
       const updatedrequirment = await requirment.save();
       
       res.status(200).json(updatedrequirment);
   } catch (error) {
       next(error);
    }
};

//absent state
export const updateabsent = async (req, res, next) => {
   try {
       const id = req.params.id;

       const requirment = await applist.findById(id);
       
         requirment.absent = true;
       const { completed } = req.body;
       const updatedrequirment = await requirment.save();
       
       res.status(200).json(updatedrequirment);
   } catch (error) {
       next(error);
    }
};


//fetch to userprofile page(get all)
export const userProfile = async (req, res, next) => {
   try {
      const userId = req.params.userId;
      
      // Find appointments for the specified user ID where completed is true
      const completedAppointments = await applist.find({ userId, completed: true });

      // Count the number of completed appointments
      const completedAppointmentsCount = completedAppointments.length;

      res.status(200).json({ count: completedAppointmentsCount });
   } catch (error) {
      next(error);
   }
};


