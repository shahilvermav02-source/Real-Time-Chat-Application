import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api_error.js";
import dotenv from "dotenv";

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    console.log("Token:", token);

    if (!token) {
      return next(new ApiError(409, "unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    socket.user = decoded;
    console.log("Socket User:", socket.user);

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    next(new Error(error.message || "Authentication failed"));
  }
};

export default socketAuth;
