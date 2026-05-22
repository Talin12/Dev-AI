export type QuestionType =
  | "mcq"
  | "short_answer"
  | "long_answer"
  | "true_false"
  | "fill_in_blank";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type AssignmentStatus = "pending" | "processing" | "completed" | "failed";

export type FormStep = 1 | 2;

export interface QuestionTypeConfig {
  type: QuestionType;
  count: number;
  marksPerQuestion: number;
}

export interface DifficultyDistribution {
  easy: number;
  medium: number;
  hard: number;
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  marks: number;
  options?: string[];
  answer?: string;
}

export interface Section {
  label: string;
  title: string;
  instruction: string;
  questions: Question[];
  totalMarks: number;
}

export interface QuestionPaper {
  assignmentId: string;
  schoolName: string;
  subject: string;
  grade: string;
  topic: string;
  timeAllowed: string;
  totalMarks: number;
  generalInstruction: string;
  sections: Section[];
  hasAnswerKey: boolean;
  generatedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: string;
  topic: string;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  difficultyDistribution: DifficultyDistribution;
  additionalInstructions?: string;
  totalMarks: number;
  totalQuestions: number;
  status: AssignmentStatus;
  jobId?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type GenerationStatus = "idle" | "pending" | "processing" | "completed" | "failed";