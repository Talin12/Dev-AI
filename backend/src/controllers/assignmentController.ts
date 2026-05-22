import { Request, Response } from "express";
import { AssignmentModel } from "../models/Assignment";
import { QuestionPaperModel } from "../models/QuestionPaper";
import { addAssignmentJob } from "../queues/assignmentQueue";
import { cacheGet, cacheSet, cacheDel } from "../config/redis";
import { generatePDF } from "../services/pdfService";
import type { QuestionPaper, Assignment, QuestionTypeConfig, DifficultyDistribution } from "../types";

export async function createAssignment(req: Request, res: Response): Promise<void> {
  const { title, subject, grade, topic, dueDate, additionalInstructions } = req.body;

  const questionTypes: QuestionTypeConfig[] =
    typeof req.body.questionTypes === "string"
      ? JSON.parse(req.body.questionTypes)
      : req.body.questionTypes;

  const difficultyDistribution: DifficultyDistribution =
    typeof req.body.difficultyDistribution === "string"
      ? JSON.parse(req.body.difficultyDistribution)
      : req.body.difficultyDistribution;

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

export async function listAssignments(_req: Request, res: Response): Promise<void> {
  const assignments = await AssignmentModel.find()
    .sort({ createdAt: -1 })
    .limit(20);

  res.json({ success: true, data: assignments.map((a) => a.toJSON()) });
}

export async function getQuestionPaper(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const cached = await cacheGet<QuestionPaper>(`paper:${id}`);
  if (cached) {
    res.json({ success: true, data: cached });
    return;
  }

  const paper = await QuestionPaperModel.findOne({ assignmentId: id });
  if (!paper) {
    res.status(404).json({ success: false, error: "Question paper not found" });
    return;
  }

  const paperJSON = paper.toJSON() as unknown as QuestionPaper;
  await cacheSet(`paper:${id}`, paperJSON);

  res.json({ success: true, data: paperJSON });
}

export async function downloadPDF(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const [assignment, paper] = await Promise.all([
    AssignmentModel.findById(id),
    QuestionPaperModel.findOne({ assignmentId: id }),
  ]);

  if (!assignment || !paper) {
    res.status(404).json({ success: false, error: "Assignment or paper not found" });
    return;
  }

  const pdfBuffer = await generatePDF(
    paper.toJSON() as unknown as QuestionPaper,
    assignment.toJSON() as unknown as Assignment
  );

  const filename = `${assignment.title.replace(/\s+/g, "_")}_Paper.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.send(pdfBuffer);
}

export async function deleteAssignment(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const assignment = await AssignmentModel.findById(id);
  if (!assignment) {
    res.status(404).json({ success: false, error: "Assignment not found" });
    return;
  }

  await Promise.all([
    AssignmentModel.findByIdAndDelete(id),
    QuestionPaperModel.findOneAndDelete({ assignmentId: id }),
    cacheDel(`paper:${id}`),
    cacheDel(`assignment:${id}`),
  ]);

  res.json({ success: true, data: { message: "Assignment deleted successfully" } });
}