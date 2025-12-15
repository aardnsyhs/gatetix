import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, CheckCircle, XCircle } from "lucide-react";

const attendees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    event: "Summer Music Festival",
    ticketType: "VIP",
    checkedIn: true,
    checkInTime: "6:15 PM",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    event: "Summer Music Festival",
    ticketType: "General",
    checkedIn: true,
    checkInTime: "6:30 PM",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    event: "Summer Music Festival",
    ticketType: "General",
    checkedIn: false,
    checkInTime: null,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    event: "Summer Music Festival",
    ticketType: "VIP",
    checkedIn: false,
    checkInTime: null,
  },
];

export default function AdminAttendees() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-foreground">
            Attendees
          </h1>
          <p className="text-muted-foreground font-body">
            View and manage event attendees
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-background text-foreground border-border hover:bg-accent"
        >
          <Download className="mr-2 h-4 w-4" strokeWidth={2} />
          Export List
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
          strokeWidth={2}
        />
        <Input
          placeholder="Search attendees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background text-foreground border-input"
        />
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Event</TableHead>
                <TableHead className="text-muted-foreground">
                  Ticket Type
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">
                  Check-in Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id} className="border-border">
                  <TableCell>
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {attendee.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {attendee.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {attendee.event}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{attendee.ticketType}</Badge>
                  </TableCell>
                  <TableCell>
                    {attendee.checkedIn ? (
                      <span className="flex items-center text-success">
                        <CheckCircle className="mr-1 h-4 w-4" strokeWidth={2} />
                        Checked In
                      </span>
                    ) : (
                      <span className="flex items-center text-muted-foreground">
                        <XCircle className="mr-1 h-4 w-4" strokeWidth={2} />
                        Not Checked In
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {attendee.checkInTime || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
