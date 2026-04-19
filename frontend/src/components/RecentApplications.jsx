import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { StatusBadge } from "./ui/badge"
import Link from "next/link";
import { Button } from "./ui/button";

export default function RecentApplications({ applications }) {

  return (
    <Card className={"border-l-1 w-full sm:w-4/6"} >
      <CardHeader>
        <CardTitle className={"text-lg font-semibold"}>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium mb-1">{app.company}</h4>
                <p className="text-sm text-muted-foreground">{app.role}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-muted-foreground">
                    {new Date(app.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    })}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>
        <Link href="/dashboard/applications">
          <Button variant="outline" className="w-full mt-4">
            View All Applications
          </Button>
        </Link>
      </CardContent>
    </Card >
  )
}