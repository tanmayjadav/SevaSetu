import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  name:{
    type:String,
    required:true,
  },
  number:{
    type:Number,
    required:true,
  },
  customerId:{
    type:String,
    unique:true,
  }
});

export const Customers = mongoose.model("customer", customerSchema);