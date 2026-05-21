import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db";
import { getRedisClient } from "./config/redis";
import { initSocket } from "./socket/socketManager";
import { assignmentRouter } from "./routes/assignments";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "veda-ai-backend",
  });
});

app.use("/api/assignments", assignmentRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorHandler);

async function boot(): Promise<void> {
  await connectDB();
  getRedisClient();
  initSocket(httpServer);

  await import("./workers/generationWorker");

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

boot().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});