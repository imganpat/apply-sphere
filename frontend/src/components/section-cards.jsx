"use client"

import { Briefcase, CheckCircleIcon, Clock, FileLock, FileText, MessagesSquare, XCircle } from "lucide-react"
import { StatCard } from "./StatCard";

export function SectionCards() {
  return (
    <div
      className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <StatCard label="Total Applications" value="10" trend="+2 this week" icon={FileLock} color="indigo" />
      <StatCard label="Interviews" value="4" trend="2 upcoming" icon={Briefcase} color="purple" />
      <StatCard label="Offers" value="1" trend="1 pending" icon={CheckCircleIcon} color="green" />
      <StatCard label="Rejections" value="2" trend="Keep going!" icon={XCircle} color="red" />
    </div>
  );
}
