const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User Disconnected : ${socket.id}`);
    });
    socket.on("join-room", async (roomId) => {
      console.log("join-room event received");
      console.log(roomId);
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
  });
};

export { socketHandler };
