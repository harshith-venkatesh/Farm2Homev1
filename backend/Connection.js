const mongoose = require("mongoose");
import dotenv from "dotenv";

const URL =
  "mongodb+srv://harshi7016:<Janaki7016>@cluster0-xfpnj.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
