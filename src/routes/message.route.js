import { getMessage } from "../contollers/message.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:roomId").get(verifyJWT, getMessage);

export default router;
