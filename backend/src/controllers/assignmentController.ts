import { Request, Response } from "express";
import { AssignmentModel } from "../models/Assignment";
import { QuestionPaperModel } from "../models/QuestionPaper";
import { addAssignmentJob } from "../queues/assignmentQueue";
import { cacheGet, cacheSet, keys } from "../config/redis";
import { generatePDF } from "../services/pdfService";
import type { QuestionPaper, Assignment, QuestionTypeConfig } from "../types";

export async function createAssignment(req: Request, res: Response): Promise<void> {
  const {
    title,
    subject,
    grade,
    topic,
    dueDate,
    questionTypes,
    difficultyDistribution,
    additionalInstructions,
  } = req.body;

  if (!title || !subject || !grade || !topic || !dueDate || !questionTypes || !difficultyDistribution) {
    res.status(400).json({ success: false, error: "Missing required fields" });
    return;
  }

  const totalQuestions = questionTypes.reduce(
    (sum: number, qt: QuestionTypeConfig) => sum + qt.count,
    0
  );

  const totalMarks = questionTypes.reduce(
    (sum: number, qt: QuestionTypeConfig) => sum + qt.count * qt.marksPerQuestion,
    0
  );

  const diffSum =
    difficultyDistribution.easy +
    difficultyDistribution.medium +
    difficultyDistribution.hard;

  if (diffSum !== 100) {
    res.status(400).json({
      success: false,
      error: "Difficulty distribution must add up to 100",
    });
    return;
  }

  const assignment = await AssignmentModel.create({
    title,
    subject,
    grade,
    topic,
    dueDate,
    questionTypes,
    difficultyDistribution,
    additionalInstructions: additionalInstructions || "",
    totalMarks,
    totalQuestions,
    uploadedFilePath: req.file?.path,
    uploadedFileName: req.file?.originalname,
    status: "pending",
  });

  const jobId = await addAssignmentJob(assignment._id.toString());
  assignment.jobId = jobId;
  await assignment.save();

  res.status(201).json({ success: true, data: assignment.toJSON() });
}

export async function getAssignment(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const assignment = await AssignmentModel.findById(id);
  if (!assignment) {
    res.status(404).json({ success: false, error: "Assignment not found" });
    return;
  }

  res.json({ success: true, data: assignment.toJSON() });
}

export async function list