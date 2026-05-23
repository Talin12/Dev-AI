"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useGenerationStore } from "../../../store/generationStore";
import { createAssignment } from "../../../lib/api";
import { FormProgressBar } from "../../../components/create/FormProgressBar";
import { StepOne } from "../../../components/create/StepOne";
import { StepTwo } from "../../../components/create/StepTwo";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const {
    title,
    subject,
    grade,
    topic,
    dueDate,
    additionalInstructions,
    file,
    questionTypes,
    difficultyDistribution,
    currentStep,
    setStep,
    resetForm,
  } = useGenerationStore();

  function validateStepOne(): string[] {
    const errs: string[] = [];
    if (!title.trim()) errs.push("Title is required");
    if (!subject.trim()) errs.push("Subject is required");
    if (!grade.trim()) errs.push("Grade is required");
    if (!topic.trim()) errs.push("Topic is required");

    const diffTotal =
      difficultyDistribution.easy +
      difficultyDistribution.medium +
      difficultyDistribution.hard;

    if (diffTotal !== 100) errs.push("Difficulty percentages must add up to 100");
    return errs;
  }

  function validateStepTwo(): string[] {
    const errs: string[] = [];
    if (!dueDate) errs.push("Due date is required");
    if (questionTypes.length === 0) errs.push("Add at least one question type");
    return errs;
  }

  function handleNext() {
    const errs = validateStepOne();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setStep(2);
  }

  async function handleSubmit() {
    const errs = validateStepTwo();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    try {
      const assignment = await createAssignment(
        {
          title,
          subject,
          grade,
          topic,
          dueDate,
          questionTypes,
          difficultyDistribution,
          additionalInstructions,
        },
        file ?? undefined
      );

      resetForm();
      router.push(`/assignments/${assignment.id}`);
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "Failed to create assignment",
      ]);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Create Assignment</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          Set up a new assignment for your students
        </p>
      </div>

      <FormProgressBar currentStep={currentStep} />

      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 mb-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {currentStep === 1 ? "Assignment Details" : "Structure & Upload"}
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {currentStep === 1
              ? "Basic information about your assignment"
              : "Define the question structure and upload any reference material"}
          </p>
        </div>

        {currentStep === 1 ? <StepOne /> : <StepTwo />}

        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            {errors.map((e, i) => (
              <p key={i} className="text-sm text-red-600">
                {e}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {currentStep === 1 ? (
          <>
            <button
              onClick={() => router.push("/assignments")}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] px-6 py-3 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setErrors([]);
                setStep(1);
              }}
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] px-6 py-3 font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-dark)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate AI Paper
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}