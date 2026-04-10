import React from 'react'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from './ui/card'

export const StatCard = ({ label, value, trend, icon: Icon, color }) => {
    const colorClasses = {
        indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-400',
        purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/40 dark:text-purple-400',
        green: 'text-green-600 bg-green-50 dark:bg-green-900/40 dark:text-green-400',
        red: 'text-red-600 bg-red-50 dark:bg-red-900/40 dark:text-red-400',
    }
    return (
        <Card className="@container/card h-fit">
            <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {value}
                </CardTitle>
                <CardAction className={"h-full flex items-center"}>
                    <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                        <Icon size="20" />
                    </div>
                </CardAction>
                <div className="line-clamp-1 flex gap-2 text-sm">
                    {trend}
                </div>
            </CardHeader>
        </Card>
    )
}
