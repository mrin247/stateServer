// Import Mongoose
const mongoose = require("mongoose");

// MongoDB connection configuration
const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.pwkc0.mongodb.net:27017,cluster0-shard-00-01.pwkc0.mongodb.net:27017,cluster0-shard-00-02.pwkc0.mongodb.net:27017/${process.env.MONGO_DBNAME}?ssl=true&replicaSet=atlas-a6bhf2-shard-0&authSource=admin&retryWrites=true&w=majority`;
const connectDB = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Mongodb Connected");
};

// Exports
module.exports = connectDB;
