import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  console.log("running");

  if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "finanzy",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed ", error);
  }
};
