"use client";

import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteTimesheetEntryApi,
  postTimesheetEntry,
  putTimesheetEntry,
} from "@/features/timesheets/api/timesheetEntries.api";
import { weekDetailQueryKey } from "@/features/timesheets/api/timesheets.api";
import type { TimesheetEntryBodyInput } from "@/lib/timesheets/timesheetEntry.schema";

function invalidateTimesheets(qc: QueryClient) {
  void qc.invalidateQueries({ queryKey: ["timesheets"] });
}

export function useCreateTimesheetEntry(weekId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: TimesheetEntryBodyInput) =>
      postTimesheetEntry(weekId, body),
    onSuccess: () => {
      invalidateTimesheets(qc);
      void qc.invalidateQueries({ queryKey: weekDetailQueryKey(weekId) });
      toast.success("Entry added");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Could not add entry",
      );
    },
  });
}

export function useUpdateTimesheetEntry(weekId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      entryId,
      body,
    }: {
      entryId: string;
      body: TimesheetEntryBodyInput;
    }) => putTimesheetEntry(weekId, entryId, body),
    onSuccess: () => {
      invalidateTimesheets(qc);
      void qc.invalidateQueries({ queryKey: weekDetailQueryKey(weekId) });
      toast.success("Entry updated");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Could not update entry",
      );
    },
  });
}

export function useDeleteTimesheetEntry(weekId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entryId: string) =>
      deleteTimesheetEntryApi(weekId, entryId),
    onSuccess: () => {
      invalidateTimesheets(qc);
      void qc.invalidateQueries({ queryKey: weekDetailQueryKey(weekId) });
      toast.success("Entry deleted");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Could not delete entry",
      );
    },
  });
}
