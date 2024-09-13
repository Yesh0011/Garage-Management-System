import Customer from "../models/customer.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken' ;

export const customersignup = async (req, res,next) => {
    const { name, email, password, phone_number, address } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newCustomer = new Customer({ name, email, password:hashedPassword, phone_number, address });
try{
    await newCustomer.save();
    res.status(201).json('Customer created successfully!')
    
}catch (error) {

next(error);
}

};

export const signin = async (req, res, next) => {

    const {email , password} = req.body;
    try{

        const validCustomer = await Customer.findOne({email });
        
        if(!validCustomer)return next(errorHandler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password, validCustomer.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        const token = jwt.sign({ id: validCustomer._id }, process.env.JWT_SECRET)
        const {password: pass, ...rest } = validCustomer._doc;
        res
        .cookie('access_token',token,{ httpOnly: true })
        .status(200)
        .json(rest);
        

    }
    catch (error) {
        next(error);
    }
}

export const google = async (req , res , next) =>{


    try{

        const user = await Customer.findOne({email :req.body.email})
        if(user){

            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token' ,token ,{ httpOnly:true})
                .status(200)
                .json(rest);

        }else{

            const generatedPassword = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8) ;
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10) ;
            const newCustomer =new Customer({name:req.body.name.split(" ").join("").toLowerCase() + Math.random().
            toString(36).slice(-4) , email: req.body.email , password:hashedPassword , avatar: req.body.photo});
            await newCustomer.save();
            const token = jwt.sign({ id: newCustomer._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newCustomer._doc;
            res.cookie('access_token' , token ,{ httpOnly:true}).status(200).json(rest);
       
        }

    }catch (error){

        next(error)
    }
};

export const signOut = async ( req , res , next) => {

    try{
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!') ;

    }catch (error){
        next(error)
    }
}