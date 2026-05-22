import { create } from "zustand";
import { getAssignments } from "../lib/api";
import type { Assignment } from "../types";

interface AssignmentStore {
  assignments: Assignment[];
  isLoading: boolean;
  error: string | null;
  fetchAssignments: () => Promise<void>;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],
  isLoading: false,
  error: null,

  fetchAssignments: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getAssignments();
      set({ assignments: data, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch assignments",
        isLoading: false,
      });
    }
  },
}));