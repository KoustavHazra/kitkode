
// require("dotenv").config();
// console.log(process.env)
const mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI;
const MONGODB_URI = 'mongodb+srv://hazrakoustav12:<your_password>@cluster0.hxfd2l5.mongodb.net/kitkode?retryWrites=true&w=majority&appName=Cluster0'


const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('MongoDB connection error');
    process.exit(0);
  }
}


module.exports = connectDb; // Export the User model for use in other files
