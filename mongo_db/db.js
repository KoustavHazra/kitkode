
// require("dotenv").config();
// console.log(process.env)
const mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI;
const MONGODB_URI = 'mongodb+srv://<your_username>:<your_password>@mongo_db_url_from_atlas'


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
