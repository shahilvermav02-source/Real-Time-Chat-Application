import express from "express";
import path from "path";

const app = express();

//basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend/html.html"));
});

export default app;
