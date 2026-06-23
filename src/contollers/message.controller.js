import { Room } from "../models/room.models.js";
import { ApiError } from "../utils/api_error.js";
import { ApiResponse } from "../utils/api_response.js";
import { asyncHandler } from "../utils/async_handler.js";
import { Message } from "../models/message.models.js";
import mongoose from "mongoose";
const getMessage = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new ApiError(400, "Invalid room id");
  }

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 20, 50);
  const skip = (page - 1) * limit;

  const room = await Room.findOne({
    _id: roomId,
    members: req.user._id,
  });

  if (!room) {
    throw new ApiError(403, "You are not a member of this room");
  }

  const messages = await Message.find({
    room: roomId,
  })
    .populate("sender", "username")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalMessages = await Message.countDocuments({
    room: roomId,
  });

  const totalPages = Math.ceil(totalMessages / limit);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { messages, page, limit, totalMessages, totalPages },
        "Message fetch successfully"
      )
    );
});

export { getMessage };
