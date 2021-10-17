import mongoose from "mongoose";

const mongoClient = async () => {
  try {
    const mongoUrl = process.env.MONGO_CLIENT;
    if (!mongoUrl) {
      return console.log("Please add environment variable");
    }
    const conn = await mongoose.connect(mongoUrl);
    if (conn) {
      console.log("mongo is connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default mongoClient;
