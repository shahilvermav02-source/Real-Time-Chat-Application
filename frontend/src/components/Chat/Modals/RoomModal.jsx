import { useState } from "react";

function RoomModal({ mode, onClose }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Please fill in the field");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      let endpoint, body;

      if (mode === "create") {
        endpoint = "http://localhost:8000/api/v1/room/createroom";
        body = { roomName: input };
      } else {
        endpoint = `http://localhost:8000/api/v1/room/joinroom/${input}`;
        body = {};
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onClose(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">
          {mode === "create" ? "Create New Room" : "Join a Room"}
        </div>

        {error && <div className="alert alert-error show">{error}</div>}

        <div className="form-group">
          <label>{mode === "create" ? "Room Name" : "Room ID"}</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "create" ? "Enter room name" : "Enter room ID"
            }
            autoFocus
          />
        </div>

        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : mode === "create" ? "Create" : "Join"}
        </button>

        <button
          className="btn-secondary"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={() => onClose(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RoomModal;
