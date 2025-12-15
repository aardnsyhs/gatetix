import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, QrCode, Download, X } from "lucide-react";

const tickets = [
  {
    id: "TKT-001",
    eventName: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM",
    location: "Central Park, NY",
    ticketType: "General Admission",
    status: "active",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-001",
  },
  {
    id: "TKT-002",
    eventName: "Tech Conference 2024",
    date: "August 20, 2024",
    time: "9:00 AM",
    location: "Convention Center, SF",
    ticketType: "VIP Pass",
    status: "active",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-002",
  },
  {
    id: "TKT-003",
    eventName: "Food & Wine Expo",
    date: "June 5, 2024",
    time: "12:00 PM",
    location: "Downtown, LA",
    ticketType: "General Admission",
    status: "used",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-003",
  },
];

export default function MyTickets() {
  const [selectedTicket, setSelectedTicket] = useState<
    (typeof tickets)[0] | null
  >(null);
  const [filter, setFilter] = useState<"all" | "active" | "used">("all");

  const filteredTickets =
    filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="gt-container">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Tickets</h1>
          <p className="text-muted-foreground">
            View and manage your event tickets
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="gt-tabs inline-flex mb-8">
          {(["all", "active", "used"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`gt-tab capitalize ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="gt-ticket p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {ticket.eventName}
                  </h3>
                  <span
                    className={`gt-badge ${
                      ticket.status === "active"
                        ? "gt-badge-success"
                        : "gt-badge-muted"
                    }`}
                  >
                    {ticket.status === "active" ? "Active" : "Used"}
                  </span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {ticket.id}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {ticket.date} at {ticket.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{ticket.location}</span>
                </div>
                <p className="text-sm">
                  <span className="text-muted-foreground">Type:</span>{" "}
                  <span className="font-medium">{ticket.ticketType}</span>
                </p>
              </div>

              <div className="gt-divider" />

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="gt-btn-outline flex-1"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Show QR
                </button>
                <Link to={`/tickets/${ticket.id}`} className="flex-1">
                  <button className="gt-btn-primary w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* QR Code Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="gt-card-flat max-w-sm w-full p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {selectedTicket.eventName}
                </h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="gt-icon-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl mb-6">
                <img
                  src={selectedTicket.qrCode}
                  alt="Ticket QR Code"
                  className="w-full aspect-square"
                />
              </div>

              <p className="text-sm text-muted-foreground text-center mb-2">
                Show this QR code at the venue entrance
              </p>
              <p className="text-xs font-mono text-center text-muted-foreground mb-6">
                {selectedTicket.id}
              </p>

              <button className="gt-btn-outline w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
