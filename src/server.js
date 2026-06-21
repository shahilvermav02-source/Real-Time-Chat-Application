import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import { initializeSocket } from "./Socket/socket.js";
import { socketHandler } from "./Socket/socketHandler.js";
dotenv.config();
const server = http.createServer(app);
const io = initializeSocket(server);
socketHandler(io);
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
