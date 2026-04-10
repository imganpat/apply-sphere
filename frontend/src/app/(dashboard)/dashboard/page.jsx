"use client"

import { useEffect, useState } from "react";
import { getJobs } from "@/lib/api";
import { SectionCards } from "@/components/section-cards";
import RecentApplications from "@/components/RecentApplications";
import AnalysisCard from "@/components/AnalysisCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    setApplications(await getJobs());
  }

  useEffect(() => {
    getApplications();
  }, [])
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {/* Cards section */}
        <div className="flex flex-col gap-4py-4 md:gap-6 md:py-6">
          <SectionCards />
        </div>

        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
          <div className="overflow-x-auto">
            <div className="flex gap-4">
              {/* Recent applications */}
              <RecentApplications applications={applications} />

              {/* Analysis and tips */}
              <div className="flex flex-col w-2/6 h-96 rounded-2xl gap-4">
                <AnalysisCard />
                <Card>
                  <CardHeader>
                    <CardTitle>Tips to Improve Your Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Tailor your resume for each application.</li>
                      <li>Write a compelling cover letter.</li>
                      <li>Prepare thoroughly for interviews.</li>
                      <li>Follow up after interviews.</li>
                      <li>Network within your industry.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
