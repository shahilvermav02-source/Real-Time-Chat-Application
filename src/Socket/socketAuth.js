import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async_handler.js";
import { ApiError } from "../utils/api_error";

const socketAuth = asyncHandlers(async (req, res) => {
  const token = socketAuth.handsake.auth.token;
  if (!token) {
    throw new ApiError(409, "unauthorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  socket.user = decoded;
  next();
});
