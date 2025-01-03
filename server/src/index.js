import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from './routes/message.route.js';
import groupRoutes from './routes/group.route.js';
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json({limit: '10mb'}));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/groups", groupRoutes);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});