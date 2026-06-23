import { Room } from "../models/room.models.js";
import { Message } from "../models/message.models.js";
import { handlePresence } from "./presence.Socket.js";
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);
    handlePresence(io, socket);

    socket.on("join-room", async (roomId) => {
      try {
        const userId = socket.user._id;
        const room = await Room.findOne({
          _id: roomId,
          members: socket.user._id,
        });
        if (!room) {
          return socket.emit("join-room-error", {
            message: "Room not found or user not a memeber",
          });
        }
        socket.join(roomId);
        io.to(roomId).emit(
          "test-message",
          `${socket.user.username} joined room`
        );

        socket.emit("joined-room", {
          roomId,
        });

        console.log(`${socket.user.username} joined ${room.name}`);
      } catch (error) {
        socket.emit("join-room-error", {
          message: "Failed to join room",
        });
      }
    });

    socket.on("send-message", async (data) => {
      try {
        const { roomId, message } = data;
        console.log(message);
        if (!message?.trim()) {
          return socket.emit("send-message-error", {
            message: "Message cannot be empty",
          });
        }
        const room = await Room.findOne({
          _id: roomId,
          members: socket.user._id,
        });
        if (!room) {
          return socket.emit("send-message-error", {
            message: "Member not part of the chat",
          });
        }
        const Savedmessage = await Message.create({
          sender: socket.user._id,
          room: roomId,
          content: message,
        });
        const populatedMessage = await Message.findById(
          Savedmessage._id
        ).populate("sender", "username");

        io.to(roomId).emit("receive-message", populatedMessage);
      } catch (error) {
        console.error(error);

        socket.emit("send-message-error", {
          message: "Failed to send message",
        });
      }
    });

    socket.on("typing", (roomId) => {
      socket.to(roomId).emit("user-typing", socket.user.username);
    });
  });
};

export { socketHandler };
