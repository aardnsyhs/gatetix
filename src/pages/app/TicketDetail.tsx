import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Download,
  Share2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function TicketDetail() {
  const { ticketId } = useParams();

  const ticket = {
    id: ticketId,
    eventName: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Central Park, New York, NY",
    venue: "Main Stage Area",
    ticketType: "General Admission",
    price: 49.0,
    purchaseDate: "June 1, 2024",
    orderNumber: "ORD-12345",
    status: "active",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
      ticketId,
    holder: "John Doe",
    email: "john.doe@example.com",
  };

  const statusHistory = [
    {
      date: "June 1, 2024",
      status: "Purchased",
      description: "Ticket purchased successfully",
    },
    {
      date: "June 1, 2024",
      status: "Confirmed",
      description: "Payment confirmed",
    },
    {
      date: "June 2, 2024",
      status: "Sent",
      description: "Ticket sent to email",
    },
  ];

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="gt-container max-w-4xl">
        <Link to="/tickets">
          <button className="gt-btn-ghost mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="gt-card-flat p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {ticket.eventName}
                  </h1>
                  <span className="gt-badge gt-badge-success">Active</span>
                </div>
                <div className="flex gap-2">
                  <button className="gt-icon-btn">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="gt-icon-btn">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{ticket.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{ticket.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{ticket.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Ticket Holder
                    </p>
                    <p className="font-medium">{ticket.holder}</p>
                  </div>
                </div>
              </div>

              <div className="gt-divider" />

              <div className="pt-4">
                <h3 className="font-semibold mb-4">Ticket Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket ID</span>
                    <span className="font-mono">{ticket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket Type</span>
                    <span>{ticket.ticketType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span>${ticket.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Number</span>
                    <span className="font-mono">{ticket.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchase Date</span>
                    <span>{ticket.purchaseDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status History */}
            <div className="gt-card-flat p-6">
              <h3 className="font-semibold mb-6">Status History</h3>
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      {index < statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QR Code Sidebar */}
          <div className="lg:col-span-1">
            <div className="gt-card-flat p-6 sticky top-24 text-center">
              <h3 className="font-semibold mb-4">Your Ticket</h3>
              <div className="bg-white p-4 rounded-2xl mb-4">
                <img
                  src={ticket.qrCode}
                  alt="Ticket QR Code"
                  className="w-full aspect-square"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Show this QR code at the venue entrance
              </p>
              <button className="gt-btn-primary w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
