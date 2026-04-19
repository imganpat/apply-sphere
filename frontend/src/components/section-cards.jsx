"use client"

import { Briefcase, CheckCircleIcon, Clock, FileLock, FileText, MessagesSquare, XCircle } from "lucide-react"
import { StatCard } from "./StatCard";

export function SectionCards({ applications }) {
  const totalApplications = applications.length;
  const interviews = applications.filter(app => app.status === "interview").length;
  const offers = applications.filter(app => app.status === "offer").length;
  const rejections = applications.filter(app => app.status === "rejected").length;

  return (
    <div
      className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <StatCard label="Total Applications" value={totalApplications} trend="+2 this week" icon={FileLock} color="indigo" />
      <StatCard label="Interviews" value={interviews} trend="2 upcoming" icon={Briefcase} color="purple" />
      <StatCard label="Offers" value={offers} trend="1 pending" icon={CheckCircleIcon} color="green" />
      <StatCard label="Rejections" value={rejections} trend="Keep going!" icon={XCircle} color="red" />
    </div>
  );
}
