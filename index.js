import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './api/routes/auth.js';
import roomsRoute from './api/routes/rooms.js';
import usersRoute from './api/routes/users.js';
import hotelsRoute from './api/routes/hotels.js';
const app = express();
dotenv.config();

// Connecting to Mongodb..
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error
    }
};

// Check Connection on Cloud : MongoDB
mongoose.connection.on("disconnected", () => {
    console.log("Mongodb disconnected");
});

//middlewares
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(8000, () => {
    connect();
    console.log("Connected to backend..");
});