import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatRoom({ currentRoom, currentUser, userRooms, socket }) {
  const [messages, setMessages] = useState([]);
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    if (!currentRoom || !socket) return;

    setMessages([]);
    socket.emit("join-room", currentRoom);

    const room = userRooms.find((r) => r._id === currentRoom);
    if (room) {
      setRoomDetails(room);
    }
  }, [currentRoom, socket]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket]);

  const handleSendMessage = (message) => {
    if (socket && currentRoom) {
      socket.emit("send-message", {
        roomId: currentRoom,
        message: message,
      });
    }
  };

  if (!currentRoom) {
    return (
      <div className="main">
        <div className="empty-state">
          <div className="empty-icon">👋</div>
          <div>Select a room to start chatting</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="chat-header">
        <div>
          <div className="chat-header-title">{roomDetails?.name || "Room"}</div>
          <div className="chat-header-info">
            {roomDetails?.members.length} member
            {roomDetails?.members.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="chat-online-indicator">
          <div className="dot"></div>
          Connected
        </div>
      </div>

      <MessageList messages={messages} currentUser={currentUser} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatRoom;
