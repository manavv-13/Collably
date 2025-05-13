const mongoose = require('mongoose');
const { Schema } = mongoose;

const influencerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  igHandle: {
    type: String, // Instagram handle
  },
  igHandleLink:{
    type:String
  },
  ytHandle: {
    type: String, // YouTube handle
  },
  ytHandleLink:{
    type:String
  },
  speciality: {
    type: [String], // List of selected values
    enum: [
      "Technology & Gadgets",
      "Fashion & Beauty",
      "Health & Fitness",
      "Food & Cooking",
      "Finance & Business",
      "Gaming & Esports",
      "Travel & Adventure",
      "Education & Motivation",
      "Lifestyle & Vlogs",
      "Entertainment & Comedy",
    ],
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile-png&psig=AOvVaw2F1v85uFXuhpMIoLldZsVf&ust=1739876248044000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPj36p_GyosDFQAAAAAdAAAAABAJ" // Store file path or URL
  },
  coverPhoto:{
    type: String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile-png&psig=AOvVaw2F1v85uFXuhpMIoLldZsVf&ust=1739876248044000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPj36p_GyosDFQAAAAAdAAAAABAJ" // Store file path or URL
  },
  lookingFor: {
    type: String, // Open-ended field for influencers to describe their goals
  },
  pricePerPost:{
    type:Number,
    required:true,
  },
  pricePerReel:{
    type:Number,
    required:true,
  },
  pricePerVideo:{
    type:Number,
    required:true,
  },
  phoneNumber: {
    type: String,
  },
  });

  const Influencer = mongoose.model('Influencer', influencerSchema);
  module.exports = Influencer;