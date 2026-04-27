import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function AnalyticsCard({ applications }) {
    const stats = useMemo(() => {
        const totalApplications = applications.length;

        let interviews = 0;
        let offers = 0;

        applications.forEach(app => {
            if (app.status === "interview") interviews++;
            else if (app.status === "offer") offers++;
        })

        return {
            interviewRate: totalApplications > 0 ? (interviews / totalApplications) * 100 : 0,
            offerRate: totalApplications > 0 ? (offers / totalApplications) * 100 : 0,
        }

    }, [applications])


    return (
        <Card className={"@container/card border-r-1"}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Success Rate
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                                Interview Rate
                            </span>
                            <span className="text-sm font-medium">
                                {stats.interviewRate.toFixed(1)}%
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 rounded-full transition-all"
                                style={{ width: `${stats.interviewRate}%` }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                                Offer Rate
                            </span>
                            <span className="text-sm font-medium">
                                {stats.offerRate.toFixed(1)}%
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all"
                                style={{ width: `${stats.offerRate}%` }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
