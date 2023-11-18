const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Conneted ");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
