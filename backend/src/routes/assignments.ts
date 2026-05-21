import { Router } from "express";
import {
  createAssignment,
  getAssignment,
  listAssignments,
} from "../controllers/assignmentController";
import { upload } from "../middleware/uploadHandler";

export const assignmentRouter = Router();

assignmentRouter.get("/", listAssignments);
assignmentRouter.post("/", upload.single("file"), createAssignment);
assignmentRouter.get("/:id", getAssignment);