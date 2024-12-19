import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from './routes/message.route.js';
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import { authenticateSocket } from "./middleware/authSocket.middleware.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use(authenticateSocket);

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);
})  

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});