"use client"

import { getApplications } from "@/lib/api";
import { SectionCards } from "@/components/section-cards";
import RecentApplications from "@/components/RecentApplications";
import AnalysisCard from "@/components/AnalysisCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });


  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className='flex items-center m-2'>
          <div className='flex gap-1 flex-col'>
            <h3 className='text-3xl font-bold'>
              Dashboard
            </h3>
            <p>Track your job applications and progress</p>
          </div>
        </div>
        {/* Cards section */}
        <div className="flex flex-col gap-4 md:gap-6 ">
          <SectionCards applications={applications} />
        </div>

        <div className="container dark:text-gray-800">
          <div className="overflow-x-auto">
            <div className="flex gap-4 w-full py-4 flex-col justify-start sm:flex-row">
              {/* Recent applications */}
              <RecentApplications applications={applications} />

              {/* Analysis and tips */}
              <div className="flex flex-col w-full sm:w-2/6 h-96 rounded-2xl gap-4">
                <AnalysisCard applications={applications} />
                <Card className={"@container/card border-r-1"}>
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
