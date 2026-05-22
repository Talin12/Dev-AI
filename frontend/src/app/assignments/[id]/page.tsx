"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { getAssignment, getPaper } from "../../../lib/api";
import { useAssignmentSocket } from "../../../hooks/useSocket";
import { useGenerationStore } from "../../../store/generationStore";
import { GeneratingLoader } from "../../../components/output/GeneratingLoader";
import { AIMessageBanner } from "../../../components/output/AIMessageBanner";
import { ExamPaper } from "../../../components/output/ExamPaper";
import type { Assignment, QuestionPaper } from "../../../types";

export default function AssignmentOutputPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [paper, setPaper] = useState<QuestionPaper | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const { generationStatus, setGenerationStatus, setAssignmentId } = useGenerationStore();

  useAssignmentSocket(id);

  useEffect(() => {
    if (!id) return;
    setAssignmentId(id);

    async function load() {
      try {
        const fetchedAssignment = await getAssignment(id);
        setAssignment(fetchedAssignment);

        if (fetchedAssignment.status === "completed") {
          const fetchedPaper = await getPaper(id);
          setPaper(fetchedPaper);
          setGenerationStatus("completed", 100, "Complete!");
        } else if (fetchedAssignment.status === "failed") {
          setGenerationStatus("failed", 0, fetchedAssignment.errorMessage || "Generation failed");
        } else {
          setGenerationStatus("processing", 10, "Generation in progress...");
        }
      } catch (err) {
        setPageError(err instanceof Error ? err.message : "Failed to load assignment");
      } finally {
        setIsLoadingPage(false);
      }
    }

    load();
  }, [id, setGenerationStatus, setAssignmentId]);

  useEffect(() => {
    if (generationStatus !== "completed" || paper) return;

    async function fetchPaperOnComplete() {
      try {
        const fetchedPaper = await getPaper(id);
        setPaper(fetchedPaper);

        const fetchedAssignment = await getAssignment(id);
        setAssignment(fetchedAssignment);
      } catch (err) {
        setPageError(err instanceof Error ? err.message : "Failed to load paper");
      }
    }

    fetchPaperOnComplete();
  }, [generationStatus, paper, id]);

  if (isLoadingPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[var(--text-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle size={40} className="text-red-400 mb-4" />
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm">{pageError}</p>
        <button
          onClick={() => router.push("/assignments")}
          className="px-5 py-2.5 bg-[var(--text-primary)] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Assignments
        </button>
      </div>
    );
  }

  if (generationStatus === "failed") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle size={40} className="text-red-400 mb-4" />
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Generation Failed
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm">
          {useGenerationStore.getState().statusMessage || "Something went wrong during generation."}
        </p>
        <button
          onClick={() => router.push("/assignments/create")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <RefreshCw size={15} />
          Try Again
        </button>
      </div>
    );
  }

  if (
    generationStatus === "pending" ||
    generationStatus === "processing" ||
    (generationStatus !== "completed" && !paper)
  ) {
    return <GeneratingLoader />;
  }

  if (generationStatus === "completed" && paper && assignment) {
    return (
      <div>
        <AIMessageBanner
          assignmentId={id}
          assignmentTitle={assignment.title}
        />
        <ExamPaper paper={paper} assignment={assignment} />
      </div>
    );
  }

  return <GeneratingLoader />;
}