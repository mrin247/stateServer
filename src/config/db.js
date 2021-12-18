const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pwkc0.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
  );

  console.log("Mongodb Connected");
};

module.exports=connectDB;
