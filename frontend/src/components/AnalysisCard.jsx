import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function AnalysisCard() {
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
                                80%
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 rounded-full transition-all"
                                style={{ width: `80%` }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                                Offer Rate
                            </span>
                            <span className="text-sm font-medium">
                                60%
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all"
                                style={{ width: `60%` }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
