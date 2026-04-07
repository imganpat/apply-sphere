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


export default function RecentApplications() {
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
            <Row company="Google" position="Backend Developer" status="Applied" appliedOn="2026-04-07" />
            <Row company="Amazon" position="Software Engineer 2" status="Screening" appliedOn="2026-04-07" />
            <Row company="MicroSoft" position="DotNet Developer" status="Interview" appliedOn="2026-04-07" />
            <Row company="Stripe" position="Product Designer" status="Offer" appliedOn="2026-04-06" />
            <Row company="Meta" position="React Developer" status="Accepted" appliedOn="2026-04-06" />
            <Row company="Apple" position="Swift Developer" status="Rejected" appliedOn="2026-04-05" />
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