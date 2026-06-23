function RoomList({ rooms, currentRoom, onRoomSelect }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div
        style={{
          color: "var(--text-secondary)",
          fontSize: "12px",
          padding: "20px 5px",
          textAlign: "center",
        }}
      >
        No rooms yet. Create or join one!
      </div>
    );
  }

  return (
    <div>
      {rooms.map((room) => (
        <div
          key={room._id}
          className={`room-item ${currentRoom === room._id ? "active" : ""}`}
          onClick={() => onRoomSelect(room._id)}
        >
          <div className="room-name">{room.name}</div>
          <div className="room-members">
            {room.members.length} member{room.members.length !== 1 ? "s" : ""}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
