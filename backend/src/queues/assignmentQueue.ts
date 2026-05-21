import { Queue } from "bullmq";
import { getBullMQRedisConnection } from "../config/redis";
import type { JobPayload } from "../types";

const QUEUE_NAME = "assignment-generation";

export const assignmentQueue = new Queue<JobPayload>(QUEUE_NAME, {
  connection: getBullMQRedisConnection(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: { count: 50 },
    removeOnFail: { count: 20 },
  },
});

export async function addAssignmentJob(assignmentId: string): Promise<string> {
  const job = await assignmentQueue.add(
    "generate",
    { assignmentId },
    { jobId: `gen-${assignmentId}` }
  );
  return job.id ?? `gen-${assignmentId}`;
}