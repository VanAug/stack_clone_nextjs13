import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("Missing MONGODB_URL");

  if (isConnected) {
    return console.log("MongoDB is alreacy connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "passTime",
    });

    isConnected = true;

    console.log("MongoDB is Connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
