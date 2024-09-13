import StatusHistory from "../models/statushistory.model.js";




export const createStatushistory = async (req ,res ,next) => {

    
    
    try {
        const { email,vehiclenumber, details } = req.body;
        const newDailyStatus = new StatusHistory({email , vehiclenumber, details });
        await newDailyStatus.save();
        res.status(201).send('Daily status added successfully');
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
};

export const getAllhistory = async (req , res , next) => {
  try{

     const issues = await StatusHistory.find();
     res.status(200).json(issues);


  }catch (error){
     next(error);
  }
};



export const customerviewreport = async(req,res,next) =>{

  try{

      const email = req.params.email;
      const user = await StatusHistory.find({email});
      
      if(!user){
          return res.status(404).json("User not found!");
      }

      res.status(200).json(user);

   }catch(error){
      next(error);
   }

};


