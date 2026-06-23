import { useEffect, useState } from "react";
import io from "socket.io-client";

let socketInstance = null;

export function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socketInstance) {
      setSocket(socketInstance);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    socketInstance = io("http://localhost:8000", {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      console.log("✓ Socket connected");
    });

    socketInstance.on("disconnect", () => {
      console.log("✗ Socket disconnected");
    });

    socketInstance.on("send-message-error", (err) => {
      console.error("Message error:", err.message);
    });

    socketInstance.on("join-room-error", (err) => {
      console.error("Join room error:", err.message);
    });

    setSocket(socketInstance);

    return () => {
      // Don't disconnect on unmount to keep connection alive
    };
  }, []);

  return socket;
}
