import { Router } from "express";
import { registerUser } from "../contollers/auth.controller";
import { login } from "../contollers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").get(verifyJWT, login);

export default router;
