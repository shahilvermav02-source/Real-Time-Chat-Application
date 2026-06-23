import { useState } from "react";
import RoomModal from "../Modals/RoomModal";

function RoomActions({ onRoomCreated, onRoomJoined, onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const handleCreateRoom = () => {
    setModalMode("create");
    setShowModal(true);
  };

  const handleJoinRoom = () => {
    setModalMode("join");
    setShowModal(true);
  };

  const handleModalClose = async (success) => {
    setShowModal(false);
    setModalMode(null);
    if (success) {
      if (modalMode === "create") {
        onRoomCreated();
      } else {
        onRoomJoined();
      }
    }
  };

  return (
    <>
      <button className="btn-small btn-primary" onClick={handleCreateRoom}>
        + Create
      </button>
      <button className="btn-small btn-secondary" onClick={handleJoinRoom}>
        Join
      </button>
      <button className="btn-small btn-secondary" onClick={onLogout}>
        Logout
      </button>

      {showModal && <RoomModal mode={modalMode} onClose={handleModalClose} />}
    </>
  );
}

export default RoomActions;
