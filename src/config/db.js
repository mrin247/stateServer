// Import Mongoose
const mongoose = require("mongoose");

// MongoDB connection configuration
const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pwkc0.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
  );

  console.log("Mongodb Connected");
};

// Exports
module.exports=connectDB;
