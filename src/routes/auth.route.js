import { Router } from "express";
import { registerUser } from "../contollers/auth.controller.js";
import { login } from "../contollers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);

export default router;
