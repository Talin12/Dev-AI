import { Router } from "express";
import {
  createAssignment,
  getAssignment,
  listAssignments,
  getQuestionPaper,
  downloadPDF,
  deleteAssignment,
  regenerateAssignment,
} from "../controllers/assignmentController";
import { upload } from "../middleware/uploadHandler";

export const assignmentRouter = Router();

assignmentRouter.get("/", listAssignments);
assignmentRouter.post("/", upload.single("file"), createAssignment);
assignmentRouter.get("/:id", getAssignment);
assignmentRouter.get("/:id/paper", getQuestionPaper);
assignmentRouter.get("/:id/pdf", downloadPDF);
assignmentRouter.delete("/:id", deleteAssignment);
assignmentRouter.post("/:id/regenerate", regenerateAssignment); // ← NEW