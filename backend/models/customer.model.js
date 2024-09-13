import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
      email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    phone_number:{
        type:String,

       // required:true,

        // required:true,

        unique:true,
    },
  
    address:{
        type:String,


        //required:true,


        // required:true,


    },
    avatar :{
    type :String,
    default :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
},

    
},{ timestamps:true });

const Customer = mongoose.model('Customer',customerSchema);

export default Customer;