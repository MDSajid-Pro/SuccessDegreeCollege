import mongoose from "mongoose";

import dns from 'dns'

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const connectDB = async () => {
    // Listen for errors AFTER connection
    mongoose.connection.on('error', (err) => {
        console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on('connected', () => {
        console.log("Database Connected successfully to:", mongoose.connection.name);
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/success-degree-college`);
    } catch (error) {
        console.error("Initial connection failed:", error);
    }
}

export default connectDB;