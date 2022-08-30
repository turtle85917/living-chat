import mongoose from "mongoose";

/**
 * Database connect.
 */
export default async () => {
  return await mongoose.connect(process.env.MONGO_URI!, {
    dbName: "data"
  });
}