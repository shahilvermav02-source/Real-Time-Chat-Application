import { Server } from "socket.io";
import socketAuth from "./socketAuth.js";
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.use(socketAuth);
  return io;
};

export { initializeSocket };
