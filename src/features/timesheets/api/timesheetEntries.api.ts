import type { TimesheetEntryBodyInput } from "@/lib/timesheets/timesheetEntry.schema";
import type { TimesheetEntryDto } from "@/types/timesheet.types";

async function readError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function postTimesheetEntry(
  weekId: string,
  body: TimesheetEntryBodyInput,
): Promise<TimesheetEntryDto> {
  const res = await fetch(`/api/timesheets/${weekId}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await readError(res));
  const data = (await res.json()) as { entry: TimesheetEntryDto };
  return data.entry;
}

export async function putTimesheetEntry(
  weekId: string,
  entryId: string,
  body: TimesheetEntryBodyInput,
): Promise<TimesheetEntryDto> {
  const res = await fetch(
    `/api/timesheets/${weekId}/entries/${entryId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(await readError(res));
  const data = (await res.json()) as { entry: TimesheetEntryDto };
  return data.entry;
}

export async function deleteTimesheetEntryApi(
  weekId: string,
  entryId: string,
): Promise<void> {
  const res = await fetch(
    `/api/timesheets/${weekId}/entries/${entryId}`,
    { method: "DELETE" },
  );
  if (!res.ok) throw new Error(await readError(res));
}
