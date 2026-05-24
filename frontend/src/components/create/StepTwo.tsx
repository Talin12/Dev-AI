"use client";

import { Plus } from "lucide-react";
import { useGenerationStore } from "../../store/generationStore";
import { FileUploadZone } from "./FileUploadZone";
import { QuestionTypeRow } from "./QuestionTypeRow";

const labelClass =
  "block font-['Bricolage_Grotesque'] font-[600] text-[14px] text-[#303030] mb-[8px]";

export function StepTwo() {
  const {
    dueDate,
    additionalInstructions,
    questionTypes,
    setField,
    addQuestionType,
    removeQuestionType,
    updateQuestionType,
  } = useGenerationStore();

  const totalQuestions = questionTypes.reduce((sum, qt) => sum + qt.count, 0);
  const totalMarks = questionTypes.reduce(
    (sum, qt) => sum + qt.count * qt.marksPerQuestion,
    0
  );

  return (
    <div className="w-full max-w-[810px] mx-auto bg-white/50 rounded-[32px] p-[32px] flex flex-col gap-[28px]">
      {/* Header */}
      <div>
        <h2 className="font-['Bricolage_Grotesque'] font-[800] text-[32px] text-[#303030] leading-tight">
          Upload Material
        </h2>
        <p className="font-['Bricolage_Grotesque'] text-[16px] text-[#5E5E5E8C] mt-1">
          Add your reference material and define the question structure.
        </p>
      </div>

      {/* File upload zone — white sub-card */}
      <div className="w-full bg-white rounded-[24px] p-[32px] flex flex-col items-center gap-[16px]">
        <FileUploadZone />
        <p className="font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#808080]">
          Upload images of your preferred document/image
        </p>
      </div>

      {/* Due Date — full-width pill */}
      <div>
        <label className={labelClass}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setField("dueDate", e.target.value)}
          className="w-full h-[44px] px-[20px] rounded-[22px] border border-[#DADADA] bg-white focus:outline-none focus:border-[#181818] font-['Bricolage_Grotesque'] font-[500] text-[15px] text-[#303030] transition-colors"
        />
      </div>

      {/* Question Type section */}
      <div>
        {/* Section header */}
        <div className="flex items-center justify-between mb-[16px]">
          <label className={labelClass + " mb-0"}>Question Type</label>
          <div className="flex items-center gap-[24px]">
            <span className="w-[100px] text-center font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#A9A9A9]">
              No. of Questions
            </span>
            <span className="w-[100px] text-center font-['Bricolage_Grotesque'] font-[500] text-[13px] text-[#A9A9A9]">
              Marks each
            </span>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-[16px]">
          {questionTypes.map((qt, index) => (
            <QuestionTypeRow
              key={index}
              index={index}
              typeData={qt}
              updateType={updateQuestionType}
              removeType={removeQuestionType}
              canRemove={questionTypes.length > 1}
            />
          ))}
        </div>

        {/* Add button + totals */}
        <div className="flex items-center justify-between mt-[20px]">
          <button
            type="button"
            onClick={addQuestionType}
            className="flex items-center gap-[12px] hover:opacity-80 transition-opacity"
          >
            <div className="w-[36px] h-[36px] rounded-full bg-[#2B2B2B] flex items-center justify-center shrink-0">
              <Plus size={16} className="text-white" />
            </div>
            <span className="font-['Bricolage_Grotesque'] font-[500] text-[14px] text-[#303030]">
              Add Question Type
            </span>
          </button>

          <div className="flex flex-col items-end gap-[4px]">
            <p className="font-['Bricolage_Grotesque'] font-[500] text-[14px] text-[#A9A9A9]">
              Total Questions:{" "}
              <span className="font-[700] text-[#303030]">{totalQuestions}</span>
            </p>
            <p className="font-['Bricolage_Grotesque'] font-[500] text-[14px] text-[#A9A9A9]">
              Total Marks:{" "}
              <span className="font-[700] text-[#303030]">{totalMarks}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <label className={labelClass}>
          Additional Information{" "}
          <span className="font-[400] text-[#A9A9A9]">(For better output)</span>
        </label>
        <textarea
          value={additionalInstructions}
          onChange={(e) => setField("additionalInstructions", e.target.value)}
          placeholder="e.g. Generate a question paper for a 3 hour exam duration..."
          rows={3}
          className="w-full px-[20px] py-[16px] rounded-[16px] border border-dashed border-[#DADADA] bg-white/25 focus:outline-none focus:border-[#303030] font-['Bricolage_Grotesque'] font-[500] text-[15px] text-[#303030] placeholder-[#A9A9A9] resize-none transition-colors"
        />
      </div>
    </div>
  );
}
