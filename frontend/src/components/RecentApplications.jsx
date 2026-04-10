import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"

const Row = ({ company, position, status, appliedOn }) => {
  return (
    <TableRow className="p-4">
      <TableCell className={"p-4 w-52 "}>{company}</TableCell>
      <TableCell>{position}</TableCell>
      <TableCell><Badge variant="secondary">{status}</Badge></TableCell>
      <TableCell className={"w-10 "}>{appliedOn}</TableCell>
    </TableRow>
  );
}


export default function RecentApplications({ applications }) {
  return (
    <Card className="p-4 w-4/6 overflow-auto h-96 rounded-2xl">
      <h2 className="text-xl font-semibold leading-tight">Recent Applications</h2>
      <Card className={"p-0 relative"}>
        <Table>
          <TableHeader>
            <TableRow className={"bg-sidebar sticky top-0 z-10"}>
              <TableHead className={"pl-4 py-4 font-semibold uppercase"}>Company</TableHead>
              <TableHead className={"py-4 font-semibold uppercase"}>Position</TableHead>
              <TableHead className={"py-4 font-semibold uppercase"}>Status</TableHead>
              <TableHead className={"py-4 font-semibold uppercase w-28"}>Applied On</TableHead>
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((application) => (
              <Row
                key={application.id}
                company={application.company_name}
                position={application.job_title}
                status={application.status}
                appliedOn={new Date(application.created_at).toLocaleDateString()}
              />
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-center p-3">
                View all applications
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </Card>
  )
}