import type { QuestionType } from "../types";

const VALID_TYPES = new Set<QuestionType>([
  "mcq",
  "short_answer",
  "long_answer",
  "true_false",
  "fill_in_blank",
]);

const TYPE_ALIASES: Record<string, QuestionType> = {
  multiple_choice: "mcq",
  multiple_choice_question: "mcq",
  "multiple-choice": "mcq",
  multichoice: "mcq",
  multi_choice: "mcq",

  short_answer_question: "short_answer",
  "short-answer": "short_answer",
  "short answer": "short_answer",
  short: "short_answer",

  long_answer_question: "long_answer",
  "long-answer": "long_answer",
  "long answer": "long_answer",
  essay: "long_answer",
  descriptive: "long_answer",

  "true/false": "true_false",
  "true-false": "true_false",
  truefalse: "true_false",
  true_or_false: "true_false",
  "true or false": "true_false",
  boolean: "true_false",

  fill_in_the_blank: "fill_in_blank",
  fill_in_the_blanks: "fill_in_blank",
  fill_in_blank_question: "fill_in_blank",
  "fill-in-the-blank": "fill_in_blank",
  "fill in the blank": "fill_in_blank",
  "fill in the blanks": "fill_in_blank",
  blank: "fill_in_blank",
  completion: "fill_in_blank",
};

export function normalizeQuestionType(raw: string): QuestionType {
  const lower = raw.trim().toLowerCase();

  if (VALID_TYPES.has(lower as QuestionType)) {
    return lower as QuestionType;
  }

  if (TYPE_ALIASES[lower]) {
    return TYPE_ALIASES[lower];
  }

  for (const valid of VALID_TYPES) {
    if (lower.includes(valid) || valid.includes(lower)) {
      return valid;
    }
  }

  console.warn(`[aiSanitizer] Unknown question type "${raw}" — defaulting to "short_answer"`);
  return "short_answer";
}

export function sanitizePaperData(paperData: Record<string, unknown>): Record<string, unknown> {
  if (!paperData.sections || !Array.isArray(paperData.sections)) {
    return paperData;
  }

  return {
    ...paperData,
    sections: paperData.sections.map((section: unknown) => {
      const sec = section as Record<string, unknown>;
      if (!sec.questions || !Array.isArray(sec.questions)) return sec;

      return {
        ...sec,
        questions: sec.questions.map((question: unknown) => {
          const q = question as Record<string, unknown>;
          if (typeof q.type !== "string") return q;

          return {
            ...q,
            type: normalizeQuestionType(q.type),
          };
        }),
      };
    }),
  };
}