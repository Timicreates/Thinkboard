import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db conected");
  } catch (error) {
    console.error("error connected db", error);
    process.exit(1);
    return;
    // exit with failure
  }
};
