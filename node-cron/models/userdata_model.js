import mongoose, { Schema } from "mongoose";

// Define the schema
const UserDataSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: 'pending',
    },
    wordCount: Number,
    titleHash: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});

// Force Mongoose to use 'UserData' as the collection name
export const UserData = mongoose.model("UserData", UserDataSchema, "UserData");
