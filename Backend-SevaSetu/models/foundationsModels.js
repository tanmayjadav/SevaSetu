import mongoose from "mongoose";

const foundationSchema = new mongoose.Schema({
  foundation_email:{
    type:String,
    required:true,
    unique:true,
  },
  foundation_name: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  foundation_head_name: {
    type: String,
    required: true,
  },
  foundation_image_url: {
    type: String,
    required: true,
  },
  foundation_cause: {
    type: String,
    required: true,
  },
  foundation_impact: {
    type: String,
    required: true,
  },
  foundation_short_description: {
    type: String,
  },
  foundation_signature_url: {
    type: String,
    required: true,
  },
  foundation_logo_url: {
    type: String,
    required: true,
  },
  foundation_password:{
    type:String,
    required:true,
  },

});

export const Foundations = mongoose.model("foundations", foundationSchema);