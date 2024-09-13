import EmplooyeeMark from "../models/employee.model.js";

export const EmployeeAdd = async (req ,res ,next) => {

    
    try{
        const newattendence = await EmplooyeeMark.create(req.body);
        return res.status(201).json(newattendence);

    }catch(error){
        next(error);
    }
};

export const getAllemp = async (req ,res) => {

    try{

       const eattendanceData = await EmplooyeeMark.find();
       if(!eattendanceData){
        return res.status(404).json({msg:"employee data not found"});
       }

      res.status(200).json(eattendanceData);

    }catch(error){

        res.status(500).json({error:error});
    }

}

export const oneaddEmp = async (req , res , next) => {
    try{

        const id = req.params.id;

        const user = await EmplooyeeMark.findById(id)
        res.status(200).json(user)
    }catch(error){

        next(error);
    }
}


export const updategetEmp = async (req, res, next) => {
    try {
        const id = req.params.id;

        const employee = await EmplooyeeMark.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.day = employee.day + 1;
        const { day } = req.body;

        if (employee.day === 26) {
            employee.day = 1;
        }

        const updatedEmployee = await employee.save();
        
        res.status(200).json(updatedEmployee);
    } catch (error) {
        next(error);
    }
};


export const updateEmpsalary = async(req , res , next) => {

    try{
 
       const id = req.params.id ;
 
       

       const updateData = await EmplooyeeMark.findByIdAndUpdate(id, req.body, {new:true});

       res.status(200).json(updateData);
 
 
    }catch( error){
       next(error);
    }
 };


 export const deleteEmpsalary = async(req,res)=>{
    try{
        const id = req.params.id;
        const employeeExist = await EmplooyeeMark.findById(id);
        if(!employeeExist){
            return res.status(404).json({msg:"User not exist"});
        }
        await EmplooyeeMark.findByIdAndDelete(id);
        res.status(200).json({msg:"employee deleted successfully"});
    }catch(error){
        req.status(500).json({error:error});
    }
}



