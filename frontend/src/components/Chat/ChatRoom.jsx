import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatRoom({ currentRoom, currentUser, userRooms, socket }) {
  const [messages, setMessages] = useState([]);
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentRoom || !socket) return;

    setMessages([]);
    setLoading(true);

    // Fetch message history
    fetchMessageHistory();

    // Join room
    socket.emit("join-room", currentRoom);

    const room = userRooms.find((r) => r._id === currentRoom);
    if (room) {
      setRoomDetails(room);
    }
  }, [currentRoom, socket]);

  const fetchMessageHistory = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/message/${currentRoom}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok && data.data) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch message history:", err);
    } finally {
      setLoading(false);
    }
  };

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

      {loading && (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "var(--text-secondary)",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading messages...
        </div>
      )}

      {!loading && (
        <>
          <MessageList messages={messages} currentUser={currentUser} />
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
}

export default ChatRoom;
