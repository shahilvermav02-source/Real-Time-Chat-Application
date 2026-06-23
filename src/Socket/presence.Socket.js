const onlineUser = new Map();

const handlePresence = (io, socket) => {
  onlineUser.set(socket.user._id.toString(), socket.id);
  io.emit("user-online", {
    userId: socket.user._id,
    username: socket.user.username,
  });

  socket.on("disconnect", () => {
    onlineUser.delete(socket.user._id.toString(), socket.id);
    io.emit("user-offline", {
      userId: socket.user._id,
      username: socket.user.username,
    });
  });
};
export { onlineUser, handlePresence };
