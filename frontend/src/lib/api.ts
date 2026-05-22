import type { Assignment, QuestionPaper, ApiResponse, QuestionTypeConfig, DifficultyDistribution } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function normalizeAssignment(raw: Assignment & { _id?: string }): Assignment & { id: string } {
  return {
    ...raw,
    id: raw._id ?? (raw as unknown as { id: string }).id,
  };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
    },
  });

  const json: ApiResponse<T> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.error || "Something went wrong");
  }

  return json.data as T;
}

export async function getAssignments(): Promise<(Assignment & { id: string })[]> {
  const data = await request<(Assignment & { _id?: string })[]>("/assignments");
  return data.map(normalizeAssignment);
}

export async function getAssignment(id: string): Promise<Assignment & { id: string }> {
  const data = await request<Assignment & { _id?: string }>(`/assignments/${id}`);
  return normalizeAssignment(data);
}

export async function getPaper(id: string): Promise<QuestionPaper> {
  return request<QuestionPaper>(`/assignments/${id}/paper`);
}

export interface CreateAssignmentPayload {
  title: string;
  subject: string;
  grade: string;
  topic: string;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  difficultyDistribution: DifficultyDistribution;
  additionalInstructions?: string;
}

export async function createAssignment(
  data: CreateAssignmentPayload,
  file?: File
): Promise<Assignment & { id: string }> {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("subject", data.subject);
  formData.append("grade", data.grade);
  formData.append("topic", data.topic);
  formData.append("dueDate", data.dueDate);
  formData.append("questionTypes", JSON.stringify(data.questionTypes));
  formData.append("difficultyDistribution", JSON.stringify(data.difficultyDistribution));

  if (data.additionalInstructions) {
    formData.append("additionalInstructions", data.additionalInstructions);
  }

  if (file) {
    formData.append("file", file);
  }

  const res = await fetch(`${BASE_URL}/assignments`, {
    method: "POST",
    body: formData,
  });

  const json: ApiResponse<Assignment & { _id?: string }> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to create assignment");
  }

  // FIX 1 applied here too — normalize the create response
  return normalizeAssignment(json.data as Assignment & { _id?: string });
}

export function downloadPDFUrl(id: string): string {
  return `${BASE_URL}/assignments/${id}/pdf`;
}