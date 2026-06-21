import { Room } from "../models/room.models";
import { ApiError } from "../utils/api_error.js";
import { ApiResponse } from "../utils/api_response.js";
import { asyncHandler } from "../utils/async_handler.js";

const createRoom = asyncHandler(async (req, res) => {
  const { roomName } = req.body;
  if (!roomName?.trim()) {
    throw new ApiError(400, "Room Cant be empty");
  }
  const room = await Room.create({
    name: Roomname,
    members: [req.user._id],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, room, "Room created successfully"));
});

const joinRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const isthereroom = await Room.findById(roomId);
  if (!isthereroom) {
    throw new ApiError(401, "room does not exist");
  }
  const Addmember = await Room.findOneAndUpdate(
    {
      _id: roomId,
      members: { $ne: req.user._id },
    },
    {
      $addToSet: {
        members: req.user._id,
      },
    },
    {
      new: true,
    }
  );
  if (!Addmember) {
    throw new ApiError(401, "Member is already part of the chat");
  }
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        Addmember,
      },
      "Room joined Successfully"
    )
  );
});
const leaveRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const roomExists = await Room.findById(roomId);
  if (!roomExists) {
    throw new ApiError(404, "Room Not found");
  }
  const isMember = roomExists.members.some((member) =>
    member.equals({ members: req.user._id })
  );
  if (!isMember) {
    throw new ApiError(400, "Not A member of this group");
  }
  const updateRoomMember = await Room.findByIdAndUpdate(roomId, {
    $pull: {
      members: req.user.id,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      200,
      {
        roomId,
      },
      "Left the room successfully"
    )
  );
});
