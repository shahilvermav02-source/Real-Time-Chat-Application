import { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ChatRoom from "./ChatRoom/ChatRoom";
import { useSocket } from "../hooks/useSocket";

function ChatApp({ currentUser, onLogout }) {
  const [userRooms, setUserRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    loadUserRooms();
  }, []);

  const loadUserRooms = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/room/getUserRooms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserRooms(data.data);
      }
    } catch (err) {
      console.error("Failed to load rooms:", err);
    }
  };

  const handleRoomCreated = async () => {
    await loadUserRooms();
  };

  const handleRoomJoined = async () => {
    await loadUserRooms();
  };

  return (
    <div className="chat-container">
      <Sidebar
        currentUser={currentUser}
        userRooms={userRooms}
        currentRoom={currentRoom}
        onlineUsers={[]}
        onRoomSelect={setCurrentRoom}
        onRoomCreated={handleRoomCreated}
        onRoomJoined={handleRoomJoined}
        onLogout={onLogout}
      />

      <ChatRoom
        currentRoom={currentRoom}
        currentUser={currentUser}
        userRooms={userRooms}
        socket={socket}
      />
    </div>
  );
}

export default ChatApp;
