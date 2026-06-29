// src/database/mongodb.ts
import mongoose from "mongoose";

const getMongoURI = (defaultDB: string): string => {
  return process.env.MONGODB_URI || `mongodb://localhost:27017/${defaultDB}`;
};

export const connectToMongoDB = async () => {
  try {
    const uri = getMongoURI("class36a");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const connectToMongoDBTest = async () => {
  try {
    const uri = getMongoURI("class36a_test");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Test");
  } catch (error) {
    console.error("Error connecting to MongoDB Test:", error);
    throw error;
  }
};
