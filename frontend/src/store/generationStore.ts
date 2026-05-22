import { create } from "zustand";
import type { QuestionTypeConfig, DifficultyDistribution, GenerationStatus } from "../types";

interface GenerationStore {
  title: string;
  subject: string;
  grade: string;
  topic: string;
  dueDate: string;
  additionalInstructions: string;
  file: File | null;
  questionTypes: QuestionTypeConfig[];
  difficultyDistribution: DifficultyDistribution;
  currentStep: 1 | 2;
  isGenerating: boolean;
  generationStatus: GenerationStatus;
  progress: number;
  statusMessage: string;
  assignmentId: string | null;

  setField: (field: string, value: string | File | null) => void;
  setStep: (step: 1 | 2) => void;
  addQuestionType: () => void;
  removeQuestionType: (index: number) => void;
  updateQuestionType: (index: number, field: keyof QuestionTypeConfig, value: string | number) => void;
  updateDifficulty: (field: keyof DifficultyDistribution, value: number) => void;
  setGenerationStatus: (status: GenerationStatus, progress: number, message: string) => void;
  setAssignmentId: (id: string) => void;
  resetForm: () => void;
}

const defaultQuestionTypes: QuestionTypeConfig[] = [
  { type: "mcq", count: 10, marksPerQuestion: 1 },
];

const defaultDifficulty: DifficultyDistribution = {
  easy: 30,
  medium: 50,
  hard: 20,
};

export const useGenerationStore = create<GenerationStore>((set) => ({
  title: "",
  subject: "",
  grade: "",
  topic: "",
  dueDate: "",
  additionalInstructions: "",
  file: null,
  questionTypes: defaultQuestionTypes,
  difficultyDistribution: defaultDifficulty,
  currentStep: 1,
  isGenerating: false,
  generationStatus: "idle",
  progress: 0,
  statusMessage: "",
  assignmentId: null,

  setField: (field, value) =>
    set((state) => ({ ...state, [field]: value })),

  setStep: (step) => set({ currentStep: step }),

  addQuestionType: () =>
    set((state) => ({
      questionTypes: [
        ...state.questionTypes,
        { type: "short_answer", count: 5, marksPerQuestion: 2 },
      ],
    })),

  removeQuestionType: (index) =>
    set((state) => ({
      questionTypes: state.questionTypes.filter((_, i) => i !== index),
    })),

  updateQuestionType: (index, field, value) =>
    set((state) => {
      const updated = [...state.questionTypes];
      updated[index] = { ...updated[index], [field]: value };
      return { questionTypes: updated };
    }),

  updateDifficulty: (field, value) =>
    set((state) => ({
      difficultyDistribution: {
        ...state.difficultyDistribution,
        [field]: value,
      },
    })),

  setGenerationStatus: (status, progress, message) =>
    set({
      generationStatus: status,
      progress,
      statusMessage: message,
      isGenerating: status === "pending" || status === "processing",
    }),

  setAssignmentId: (id) => set({ assignmentId: id }),

  resetForm: () =>
    set({
      title: "",
      subject: "",
      grade: "",
      topic: "",
      dueDate: "",
      additionalInstructions: "",
      file: null,
      questionTypes: defaultQuestionTypes,
      difficultyDistribution: defaultDifficulty,
      currentStep: 1,
      isGenerating: false,
      generationStatus: "idle",
      progress: 0,
      statusMessage: "",
      assignmentId: null,
    }),
}));