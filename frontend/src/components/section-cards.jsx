"use client"

import { Briefcase, CheckCircleIcon, FileLock, XCircle } from "lucide-react"
import { StatCard } from "./StatCard";
import { useMemo } from "react";


export function SectionCards({ applications }) {
  const stats = useMemo(() => {
    const result = {
      totalApplications: applications.length,
      interviews: 0,
      offers: 0,
      rejections: 0,
    };

    applications.forEach(app => {
      if (app.status === "interview") result.interviews++;
      else if (app.status === "offer") result.offers++;
      else if (app.status === "rejected") result.rejections++;
    })

    return result

  }, [applications]);


  return (
    <div
      className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <StatCard label="Total Applications" value={stats.totalApplications} trend="+2 this week" icon={FileLock} color="indigo" />
      <StatCard label="Interviews" value={stats.interviews} trend="2 upcoming" icon={Briefcase} color="purple" />
      <StatCard label="Offers" value={stats.offers} trend="1 pending" icon={CheckCircleIcon} color="green" />
      <StatCard label="Rejections" value={stats.rejections} trend="Keep going!" icon={XCircle} color="red" />
    </div>
  );
}
