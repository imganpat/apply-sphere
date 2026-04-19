import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function AnalysisCard({ applications }) {
    const totalApplications = applications.length;
    const interviews = applications.filter(app => app.status === "interview").length;
    const offers = applications.filter(app => app.status === "offer").length;
    const interviewRate = totalApplications > 0 ? (interviews / totalApplications) * 100 : 0;
    const offerRate = totalApplications > 0 ? (offers / totalApplications) * 100 : 0;

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
                                {interviewRate.toFixed(1)}%
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 rounded-full transition-all"
                                style={{ width: `${interviewRate}%` }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                                Offer Rate
                            </span>
                            <span className="text-sm font-medium">
                                {offerRate.toFixed(1)}%
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all"
                                style={{ width: `${offerRate}%` }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
