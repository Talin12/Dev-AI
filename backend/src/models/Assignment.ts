import mongoose, { Document, Schema } from "mongoose";
import type {
  Assignment,
  AssignmentStatus,
  QuestionTypeConfig,
  DifficultyDistribution,
} from "../types";

export interface IAssignmentDocument extends Omit<Assignment, "status">, Document {
  _id: mongoose.Types.ObjectId;
  status: AssignmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionTypeConfigSchema = new Schema<QuestionTypeConfig>(
  {
    type: {
      type: String,
      enum: ["mcq", "short_answer", "long_answer", "true_false", "fill_in_blank"],
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: [1, "Question count must be at least 1"],
    },
    marksPerQuestion: {
      type: Number,
      required: true,
      min: [1, "Marks per question must be at least 1"],
    },
  },
  { _id: false }
);

const DifficultyDistributionSchema = new Schema<DifficultyDistribution>(
  {
    easy: { type: Number, required: true, min: 0, max: 100 },
    medium: { type: Number, required: true, min: 0, max: 100 },
    hard: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false }
);

const AssignmentSchema = new Schema<IAssignmentDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    grade: {
      type: String,
      required: [true, "Grade is required"],
      trim: true,
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
      minlength: [3, "Topic must be at least 3 characters"],
    },
    dueDate: {
      type: String,
      required: [true, "Due date is required"],
    },
    questionTypes: {
      type: [QuestionTypeConfigSchema],
      required: true,
      validate: {
        validator: (v: QuestionTypeConfig[]) => v.length > 0,
        message: "At least one question type is required",
      },
    },
    difficultyDistribution: {
      type: DifficultyDistributionSchema,
      required: true,
    },
    additionalInstructions: {
      type: String,
      trim: true,
      default: "",
    },
    totalMarks: {
      type: Number,
      required: true,
      min: [1, "Total marks must be at least 1"],
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: [1, "Total questions must be at least 1"],
    },
    uploadedFilePath: { type: String },
    uploadedFileName: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    jobId: { type: String },
    errorMessage: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        ret.id = (ret._id as { toString(): string }).toString();
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

export const AssignmentModel = mongoose.model<IAssignmentDocument>(
  "Assignment",
  AssignmentSchema
);