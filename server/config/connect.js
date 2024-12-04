const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/project");
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

module.exports = connectToDatabase;