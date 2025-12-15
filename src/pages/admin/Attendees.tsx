import { useState } from "react";
import {
  Download,
  CheckCircle,
  XCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Attendees</h1>
          <p className="text-muted-foreground mt-1">
            View and manage event attendees
          </p>
        </div>
        <div className="flex gap-2">
          <button className="gt-btn-ghost">
            <Mail className="h-4 w-4 mr-2" />
            Email All
          </button>
          <button className="gt-btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="gt-card-flat p-5">
          <p className="text-sm text-muted-foreground">Total Attendees</p>
          <p className="text-3xl font-bold mt-1">{attendees.length}</p>
        </div>
        <div className="gt-card-flat p-5">
          <p className="text-sm text-muted-foreground">Checked In</p>
          <p className="text-3xl font-bold mt-1 text-success">
            {checkedInCount}
          </p>
        </div>
        <div className="gt-card-flat p-5">
          <p className="text-sm text-muted-foreground">Check-in Rate</p>
          <p className="text-3xl font-bold mt-1">
            {Math.round((checkedInCount / attendees.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search attendees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="gt-input-search max-w-md"
      />

      {/* Attendees Table */}
      <div className="gt-card-flat overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gt-table">
            <thead>
              <tr>
                <th>Attendee</th>
                <th>Event</th>
                <th>Ticket Type</th>
                <th>Status</th>
                <th>Check-in Time</th>
                <th>Gate</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((attendee) => (
                <tr key={attendee.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="gt-avatar text-xs">
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
                  </td>
                  <td>{attendee.event}</td>
                  <td>
                    <span
                      className={`gt-badge ${
                        attendee.ticketType === "VIP"
                          ? "gt-badge-primary"
                          : "gt-badge-muted"
                      }`}
                    >
                      {attendee.ticketType}
                    </span>
                  </td>
                  <td>
                    {attendee.checkedIn ? (
                      <span className="flex items-center gap-1.5 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Checked In</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm">Not Checked In</span>
                      </span>
                    )}
                  </td>
                  <td className="text-muted-foreground">
                    {attendee.checkInTime || "—"}
                  </td>
                  <td className="text-muted-foreground">
                    {attendee.gate || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">5</span> attendees
          </p>
          <div className="flex items-center gap-2">
            <button className="gt-icon-btn" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-medium">
              1
            </button>
            <button className="gt-icon-btn" disabled>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
