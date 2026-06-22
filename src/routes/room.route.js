import { Router } from "express";
import {
  joinRoom,
  createRoom,
  leaveRoom,
} from "../contollers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/createroom").post(verifyJWT, createRoom);
router.route("/joinroom/:roomId").post(verifyJWT, joinRoom);

export default router;
