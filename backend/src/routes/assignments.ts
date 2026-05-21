import { Router } from "express";
import {
  createAssignment,
  getAssignment,
  listAssignments,
} from "../controllers/assignmentController";

export const assignmentRouter = Router();

assignmentRouter.get("/", listAssignments);
assignmentRouter.post("/", createAssignment);
assignmentRouter.get("/:id", getAssignment);