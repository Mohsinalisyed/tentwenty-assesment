import type { Metadata } from "next";

import { TimesheetsDashboard } from "@/features/timesheets/components/TimesheetsDashboard";

export const metadata: Metadata = {
  title: "Timesheets | ticktock",
};

export default function DashboardPage() {
  return <TimesheetsDashboard />;
}
