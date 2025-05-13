const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      brandName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required:true,
      },
      lookingFor: {
        type: String,
        required:true,
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
        required: true, // Ensures at least one category is selected
      },
      phoneNumber: {
        type: String,
        required:true,
      },
      coverPhoto:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdesktop-background&psig=AOvVaw1xgEnx8p80psXHIkQewoq3&ust=1740819303849000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCJhLX_5YsDFQAAAAAdAAAAABAE"
      },
      website : {
        type: String,
        required:true
      }
  });

  const Brand = mongoose.model('Brand', brandSchema);
  module.exports = Brand;