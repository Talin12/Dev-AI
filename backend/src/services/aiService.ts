import OpenAI from "openai";
import { z } from "zod";
import type { Assignment, QuestionPaper } from "../types";

const hf = new OpenAI({
  apiKey: process.env.HF_API_KEY,
  baseURL: "https://api-inference.huggingface.co/v1",
});

const TYPE_ALIAS_MAP: Record<string, string> = {
  multiple_choice: "mcq",
  multiple_choice_question: "mcq",
  multiple_choice_questions: "mcq",
  "multiple-choice": "mcq",
  multichoice: "mcq",
  multi_choice: "mcq",

  short_answer_question: "short_answer",
  short_answer_questions: "short_answer",
  "short-answer": "short_answer",
  short_answers: "short_answer",
  short: "short_answer",

  long_answer_question: "long_answer",
  long_answer_questions: "long_answer",
  "long-answer": "long_answer",
  long_answers: "long_answer",
  essay: "long_answer",
  descriptive: "long_answer",

  "true/false": "true_false",
  "true-false": "true_false",
  truefalse: "true_false",
  true_or_false: "true_false",
  true_false_question: "true_false",
  true_false_questions: "true_false",
  boolean: "true_false",

  fill_in_the_blank: "fill_in_blank",
  fill_in_the_blanks: "fill_in_blank",
  fill_in_blank_question: "fill_in_blank",
  fill_in_blank_questions: "fill_in_blank",
  "fill-in-the-blank": "fill_in_blank",
  "fill-in-blank": "fill_in_blank",
  fillintheblanks: "fill_in_blank",
  blank: "fill_in_blank",
  completion: "fill_in_blank",
};

const VALID_TYPES = new Set([
  "mcq",
  "short_answer",
  "long_answer",
  "true_false",
  "fill_in_blank",
]);

function normalizeType(val: unknown): string {
  const s = String(val)
    .trim()
    .toLowerCase()
    .replace(/[\s/]+/g, "_")   
    .replace(/-+/g, "_");      

  if (VALID_TYPES.has(s)) return s;

  if (TYPE_ALIAS_MAP[s]) return TYPE_ALIAS_MAP[s];

  for (const valid of VALID_TYPES) {
    if (s.includes(valid)) return valid;
  }

  console.warn(`[aiService] Unknown question type "${val}" — defaulting to "short_answer"`);
  return "short_answer";
}

const QuestionSchema = z.object({
  id: z.number(),
  text: z.string().min(5),
  type: z.preprocess(
    normalizeType,
    z.enum(["mcq", "short_answer", "long_answer", "true_false", "fill_in_blank"])
  ),
  difficulty: z.preprocess(
    // Also guard difficulty in case AI returns "Easy" with a capital
    (val) => String(val).trim().toLowerCase(),
    z.enum(["easy", "medium", "hard"])
  ),
  marks: z.number().positive(),
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
});

const SectionSchema = z.object({
  label: z.string(),
  title: z.string(),
  instruction: z.string(),
  questions: z.array(QuestionSchema).min(1),
  totalMarks: z.number().positive(),
});

const GeneratedPaperSchema = z.object({
  schoolName: z.string(),
  subject: z.string(),
  grade: z.string(),
  topic: z.string(),
  timeAllowed: z.string(),
  totalMarks: z.number().positive(),
  generalInstruction: z.string(),
  sections: z.array(SectionSchema).min(1),
  hasAnswerKey: z.boolean(),
});

type GeneratedPaper = z.infer<typeof GeneratedPaperSchema>;

const TYPE_LABELS: Record<string, string> = {
  mcq: "Multiple Choice Questions (provide exactly 4 options labeled A, B, C, D)",
  short_answer: "Short Answer Questions (2-3 lines expected)",
  long_answer: "Long Answer Questions (detailed explanation required)",
  true_false: "True or False Questions",
  fill_in_blank: "Fill in the Blank Questions",
};

const SECTION_LABELS = ["A", "B", "C", "D", "E"];

function buildPrompt(assignment: Assignment): string {
  const sections = assignment.questionTypes
    .map((qt, i) => {
      return `Section ${SECTION_LABELS[i]}: ${TYPE_LABELS[qt.type]}
- Questions: ${qt.count}
- Marks each: ${qt.marksPerQuestion}
- Section total: ${qt.count * qt.marksPerQuestion} marks`;
    })
    .join("\n\n");

  const diff = assignment.difficultyDistribution;

  const allowedTypes = `"mcq", "short_answer", "long_answer", "true_false", "fill_in_blank"`;

  return `You are generating a formal school exam paper. Return ONLY a valid JSON object with no markdown, no code fences, no explanation.

Subject: ${assignment.subject}
Grade: ${assignment.grade}
Topic: ${assignment.topic}
Total Marks: ${assignment.totalMarks}
Additional Instructions: ${assignment.additionalInstructions || "None"}

Difficulty split across all questions:
- Easy: ${diff.easy}%
- Medium: ${diff.medium}%
- Hard: ${diff.hard}%

Sections:
${sections}

CRITICAL: The "type" field of every question MUST be one of exactly these strings: ${allowedTypes}
Do NOT use any other values such as "multiple_choice", "true/false", or "fill_in_the_blank".

Rules:
- Questions must suit ${assignment.grade} students
- MCQ must always have exactly 4 options
- Distribute difficulty as specified
- Include an answer key for every question
- Re-calculate each section's totalMarks as sum of its questions' marks

Return this exact JSON structure:
{
  "schoolName": "Delhi Public School",
  "subject": "${assignment.subject}",
  "grade": "${assignment.grade}",
  "topic": "${assignment.topic}",
  "timeAllowed": "estimated duration",
  "totalMarks": ${assignment.totalMarks},
  "generalInstruction": "All questions are compulsory unless stated otherwise.",
  "hasAnswerKey": true,
  "sections": [
    {
      "label": "Section A",
      "title": "section type title",
      "instruction": "instruction for this section",
      "totalMarks": 0,
      "questions": [
        {
          "id": 1,
          "text": "question text",
          "type": "mcq",
          "difficulty": "easy",
          "marks": 1,
          "options": [
            "A. option1",
            "B. option2",
            "C. option3",
            "D. option4"
          ],
          "answer": "A. option1"
        }
      ]
    }
  ]
}`;
}

function stripFences(raw: string): string {
  let clean = raw.trim();

  if (clean.startsWith("```json")) {
    clean = clean.slice(7);
  } else if (clean.startsWith("```")) {
    clean = clean.slice(3);
  }

  if (clean.endsWith("```")) {
    clean = clean.slice(0, -3);
  }

  return clean.trim();
}

export async function generatePaper(
  assignment: Assignment
): Promise<Omit<QuestionPaper, "assignmentId" | "generatedAt">> {
  const prompt = buildPrompt(assignment);

  const completion = await hf.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    messages: [
      {
        role: "system",
        content:
          'You are an exam paper generator. Respond with valid JSON only. No markdown, no extra text. Question type values must be one of: "mcq", "short_answer", "long_answer", "true_false", "fill_in_blank".',
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  });

  const raw = completion.choices[0]?.message?.content;

  if (!raw) {
    throw new Error("HuggingFace returned an empty response");
  }

  const cleaned = stripFences(raw);

  let parsed: unknown;

  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse HuggingFace response as JSON");
  }

  const result = GeneratedPaperSchema.safeParse(parsed);

  if (!result.success) {
    const errors = result.error.issues
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join(", ");

    throw new Error(`Response validation failed: ${errors}`);
  }

  const paper: GeneratedPaper = {
    ...result.data,
    sections: result.data.sections.map((section) => ({
      ...section,
      totalMarks: section.questions.reduce((sum, q) => sum + q.marks, 0),
    })),
  };

  return paper;
}