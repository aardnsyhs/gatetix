"use client";

import { useState } from "react";
import {
  Download,
  CheckCircle,
  XCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const attendees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    event: "Summer Music Festival",
    ticketType: "VIP",
    checkedIn: true,
    checkInTime: "6:15 PM",
    gate: "Gate A",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    event: "Summer Music Festival",
    ticketType: "General",
    checkedIn: true,
    checkInTime: "6:30 PM",
    gate: "Gate B",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    event: "Summer Music Festival",
    ticketType: "General",
    checkedIn: false,
    checkInTime: null,
    gate: null,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    event: "Summer Music Festival",
    ticketType: "VIP",
    checkedIn: false,
    checkInTime: null,
    gate: null,
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    event: "Summer Music Festival",
    ticketType: "General",
    checkedIn: true,
    checkInTime: "7:00 PM",
    gate: "Gate A",
  },
];

export default function AdminAttendees() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const checkedInCount = attendees.filter((a) => a.checkedIn).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Attendees</h1>
          <p className="text-muted-foreground mt-1">
            View and manage event attendees
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="rounded-xl">
            <Mail className="h-4 w-4 mr-2" />
            Email All
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Attendees</p>
            <p className="text-3xl font-bold mt-1">{attendees.length}</p>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Checked In</p>
            <p className="text-3xl font-bold mt-1 text-emerald-500">
              {checkedInCount}
            </p>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Check-in Rate</p>
            <p className="text-3xl font-bold mt-1">
              {Math.round((checkedInCount / attendees.length) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Input
        type="text"
        placeholder="Search attendees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md rounded-xl"
      />

      <Card className="gt-card-glow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Attendee</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Ticket Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead>Gate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gt-gradient-primary flex items-center justify-center text-white text-xs font-medium">
                      {attendee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{attendee.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {attendee.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{attendee.event}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      attendee.ticketType === "VIP" ? "default" : "secondary"
                    }
                    className={
                      attendee.ticketType === "VIP"
                        ? "bg-primary/10 text-primary"
                        : ""
                    }
                  >
                    {attendee.ticketType}
                  </Badge>
                </TableCell>
                <TableCell>
                  {attendee.checkedIn ? (
                    <span className="flex items-center gap-1.5 text-emerald-500">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Checked In</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">Not Checked In</span>
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {attendee.checkInTime || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {attendee.gate || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">5</span> attendees
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled
              className="rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="gt-gradient-primary border-0 rounded-xl"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled
              className="rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
