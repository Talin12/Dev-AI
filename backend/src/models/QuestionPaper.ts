import mongoose, { Document, Schema } from "mongoose";
import type { QuestionPaper, Section, Question } from "../types";

export interface IQuestionPaperDocument extends Omit<QuestionPaper, "assignmentId">, Document {
  _id: mongoose.Types.ObjectId;
  assignmentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<Question>(
  {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    type: {
      type: String,
      enum: ["mcq", "short_answer", "long_answer", "true_false", "fill_in_blank"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    marks: { type: Number, required: true, min: 1 },
    options: [{ type: String }],
    answer: { type: String },
  },
  { _id: false }
);

const SectionSchema = new Schema<Section>(
  {
    label: { type: String, required: true },
    title: { type: String, required: true },
    instruction: { type: String, required: true },
    questions: {
      type: [QuestionSchema],
      required: true,
      validate: {
        validator: (v: Question[]) => v.length > 0,
        message: "Each section must have at least one question",
      },
    },
    totalMarks: { type: Number, required: true },
  },
  { _id: false }
);

const QuestionPaperSchema = new Schema<IQuestionPaperDocument>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
      unique: true,
      index: true,
    },
    schoolName: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    grade: { type: String, required: true },
    topic: { type: String, required: true },
    timeAllowed: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    generalInstruction: { type: String, required: true },
    sections: {
      type: [SectionSchema],
      required: true,
      validate: {
        validator: (v: Section[]) => v.length > 0,
        message: "Paper must have at least one section",
      },
    },
    hasAnswerKey: { type: Boolean, default: true },
    generatedAt: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        ret.id = (ret._id as { toString(): string }).toString();
        ret.assignmentId = (ret.assignmentId as { toString(): string }).toString();
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

export const QuestionPaperModel = mongoose.model<IQuestionPaperDocument>(
  "QuestionPaper",
  QuestionPaperSchema
);