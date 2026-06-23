import { Router } from "express";
import {
  joinRoom,
  createRoom,
  leaveRoom,
  getUserRooms,
} from "../contollers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/getUserRooms").get(verifyJWT, getUserRooms);
router.route("/createroom").post(verifyJWT, createRoom);
router.route("/joinroom/:roomId").post(verifyJWT, joinRoom);
router.route("/leaveroom/:roomId").post(verifyJWT, leaveRoom);

export default router;
