import express from "express";
import cors from "cors";
import path from "path";
import authRouter from "./routes/auth.route.js"; //in that file default export is used so you define your name when importing it here
import roomRouter from "./routes/room.route.js";
import messageRouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
const app = express();

//basic configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // to serve static files from the "public" directory
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:8001", // Allow requests from the specified origin(s)
    credentials: true, // Allow cookies to be sent in cross-origin requests
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend/html.html"));
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/message", messageRouter);

export default app;
