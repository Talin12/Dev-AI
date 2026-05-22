"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useGenerationStore } from "../store/generationStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const WS_URL = API_URL.split("/api")[0]; 

export function useAssignmentSocket(assignmentId: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const { setGenerationStatus } = useGenerationStore();

  useEffect(() => {
    if (!assignmentId) return;

    const socket = io(WS_URL, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("WebSocket Connected Successfully!");
      socket.emit("join-room", assignmentId);
    });

    socket.on("generation:started", () => {
      setGenerationStatus("processing", 10, "Starting generation...");
    });

    socket.on(
      "generation:progress",
      (data: { percent: number; message: string }) => {
        setGenerationStatus("processing", data.percent, data.message);
      }
    );

    socket.on("generation:complete", () => {
      setGenerationStatus("completed", 100, "Your question paper is ready!");
    });

    socket.on("generation:failed", (data: { error: string }) => {
      setGenerationStatus("failed", 0, data.error || "Generation failed. Please try again.");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [assignmentId, setGenerationStatus]);

  return socketRef.current;
}