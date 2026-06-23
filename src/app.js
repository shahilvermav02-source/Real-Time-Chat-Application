import express from "express";
import path from "path";
import authRouter from "./routes/auth.route.js"; //in that file default export is used so you define your name when importing it here
import roomRouter from "./routes/room.route.js";
import messageRouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
const app = express();

//basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // to serve static files from the "public" directory
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend/html.html"));
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);

export default app;
