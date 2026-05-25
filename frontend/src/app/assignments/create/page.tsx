"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
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
    <div className="w-full flex flex-col gap-[32px] bg-[linear-gradient(180deg,#EEEEEE_0%,#DADADA_100%)] min-h-screen rounded-[16px] p-[40px]">
      <FormProgressBar currentStep={currentStep} />

      {currentStep === 1 ? <StepOne /> : <StepTwo />}

      {errors.length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          {errors.map((e, i) => (
            <p key={i} className="text-sm text-red-600">
              {e}
            </p>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-[16px]">
        {currentStep === 1 ? (
          <>
            <button
              onClick={() => router.push("/assignments")}
              className="font-['Bricolage_Grotesque'] font-[500] text-[15px] text-[#5E5E5E] hover:text-[#303030] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="h-[48px] px-[32px] bg-[#181818] text-white rounded-[12px] font-['Bricolage_Grotesque'] font-[600] text-[15px] tracking-[-0.04em] hover:bg-black transition-colors"
            >
              Next
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setErrors([]);
                setStep(1);
              }}
              className="flex items-center gap-2 font-['Bricolage_Grotesque'] font-[500] text-[15px] text-[#5E5E5E] hover:text-[#303030] transition-colors"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-[48px] px-[32px] bg-[#181818] text-white rounded-[12px] font-['Bricolage_Grotesque'] font-[600] text-[15px] tracking-[-0.04em] hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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
