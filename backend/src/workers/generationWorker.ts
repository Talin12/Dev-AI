import { Worker } from "bullmq";
import { getBullMQRedisConnection } from "../config/redis";
import { cacheSet, keys } from "../config/redis";
import { AssignmentModel } from "../models/Assignment";
import { QuestionPaperModel } from "../models/QuestionPaper";
import { generatePaper } from "../services/aiService";
import { getIO } from "../socket/socketManager";
import type { JobPayload } from "../types";

function emit(assignmentId: string, event: string, data: Record<string, unknown>) {
  try {
    getIO().to(assignmentId).emit(event, data);
  } catch {
    console.warn("Socket emit failed — IO not ready yet");
  }
}

const worker = new Worker<JobPayload>(
  "assignment-generation",
  async (job) => {
    const { assignmentId } = job.data;

    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment) throw new Error(`Assignment ${assignmentId} not found`);

    assignment.status = "processing";
    await assignment.save();

    emit(assignmentId, "generation:started", { assignmentId });

    await job.updateProgress(10);
    emit(assignmentId, "generation:progress", {
      assignmentId,
      percent: 10,
      message: "Analyzing requirements...",
    });

    const paperData = await generatePaper(assignment.toJSON());

    await job.updateProgress(80);
    emit(assignmentId, "generation:progress", {
      assignmentId,
      percent: 80,
      message: "Formatting paper...",
    });

    await QuestionPaperModel.findOneAndDelete({ assignmentId: assignment._id });

    const paper = await QuestionPaperModel.create({
      assignmentId: assignment._id,
      ...paperData,
      generatedAt: new Date().toISOString(),
    });

    await cacheSet(keys.paper(assignmentId), paper.toJSON());

    assignment.status = "completed";
    await assignment.save();

    await job.updateProgress(100);
    emit(assignmentId, "generation:complete", { assignmentId });
  },
  {
    connection: getBullMQRedisConnection(),
    concurrency: 3,
  }
);

worker.on("failed", async (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);

  if (job?.data?.assignmentId) {
    const { assignmentId } = job.data;

    await AssignmentModel.findByIdAndUpdate(assignmentId, {
      status: "failed",
      errorMessage: err.message,
    });

    emit(assignmentId, "generation:failed", {
      assignmentId,
      error: "Generation failed. Please try again.",
    });
  }
});

export { worker };