import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import { initializeSocket } from "./Socket/socket.js";
import { socketHandler } from "./Socket/socketHandler.js";
import { initializeSubscriber } from "./Services/redisSubscriber.js";
import connectDB from "./configs/db.js";
dotenv.config();
const server = http.createServer(app);
const io = initializeSocket(server);
socketHandler(io);
initializeSubscriber(io);
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
