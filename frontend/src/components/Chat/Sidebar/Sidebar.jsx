import RoomList from "./RoomList";
import RoomActions from "./RoomActions";

function Sidebar({
  currentUser,
  userRooms,
  currentRoom,
  onRoomSelect,
  onRoomCreated,
  onRoomJoined,
  onLogout,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">💬</div>
          ChatHub
        </div>
      </div>

      <div className="user-info">
        <div className="user-avatar">
          {currentUser?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="user-details">
          <div className="user-name">{currentUser?.username}</div>
          <div className="user-status">Online</div>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="rooms-section">
          <div className="rooms-title">Your Rooms</div>
          <RoomList
            rooms={userRooms}
            currentRoom={currentRoom}
            onRoomSelect={onRoomSelect}
          />
        </div>
      </div>

      <div className="sidebar-footer">
        <RoomActions
          onRoomCreated={onRoomCreated}
          onRoomJoined={onRoomJoined}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

export default Sidebar;
