import { Room } from "../models/room.models";
import { ApiError } from "../utils/api_error";
import { ApiResponse } from "../utils/api_response";
import { asyncHandler } from "../utils/async_handler";

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

  if (!room) {
    //through api error
  }
  const alreadyMember = room.members.some((member) =>
    member.equals(req.user._id)
  );
  if (!alreadyMember) {
  }
  const room = await Room.findOneAndUpdate(
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
  return res.status(200).json(
    new ApiResponse(
      201,
      {
        room,
        userId: req.user._id,
      },
      "Room joined Successfully"
    )
  );
});
