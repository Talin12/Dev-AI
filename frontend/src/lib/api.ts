import type {
  Assignment,
  QuestionPaper,
  ApiResponse,
  QuestionTypeConfig,
  DifficultyDistribution,
} from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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

export async function getAssignments(): Promise<Assignment[]> {
  return request<Assignment[]>("/assignments");
}

export async function getAssignment(id: string): Promise<Assignment> {
  return request<Assignment>(`/assignments/${id}`);
}

export async function getPaper(id: string): Promise<QuestionPaper> {
  return request<QuestionPaper>(`/assignments/${id}/paper`);
}

export async function deleteAssignment(id: string): Promise<void> {
  await request<{ message: string }>(`/assignments/${id}`, {
    method: "DELETE",
  });
}

export async function regenerateAssignment(id: string): Promise<Assignment> {
  return request<Assignment>(`/assignments/${id}/regenerate`, {
    method: "POST",
  });
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
): Promise<Assignment> {
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

  const json: ApiResponse<Assignment> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to create assignment");
  }

  return json.data as Assignment;
}

export function downloadPDFUrl(id: string): string {
  return `${BASE_URL}/assignments/${id}/pdf`;
}