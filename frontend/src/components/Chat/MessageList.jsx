import { useEffect, useRef } from "react";

function MessageList({ messages, currentUser }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messages-container" ref={containerRef}>
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <div>No messages yet. Start the conversation!</div>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className="message">
            <div className="message-avatar">
              {msg.sender.username.charAt(0).toUpperCase()}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-author">{msg.sender.username}</span>
                <span className="message-time">
                  {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="message-text">{msg.content}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;
