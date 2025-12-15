import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Ticket,
  DollarSign,
  Edit,
  MoreVertical,
  Share2,
  Eye,
} from "lucide-react";

export default function AdminEventDetail() {
  const { eventId } = useParams();

  const event = {
    id: eventId,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Central Park, NY",
    status: "published",
    description:
      "Join us for an unforgettable evening of live music featuring top artists from around the world. Experience multiple stages, food vendors, and an electric atmosphere.",
    ticketsSold: 450,
    capacity: 1000,
    revenue: 22050,
    checkInRate: 0,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
    ticketTypes: [
      {
        name: "General Admission",
        price: 49,
        sold: 350,
        available: 500,
        color: "from-blue-500 to-cyan-500",
      },
      {
        name: "VIP",
        price: 149,
        sold: 80,
        available: 100,
        color: "from-purple-500 to-pink-500",
      },
      {
        name: "Early Bird",
        price: 39,
        sold: 20,
        available: 0,
        color: "from-emerald-500 to-teal-500",
      },
    ],
  };

  const stats = [
    {
      label: "Tickets Sold",
      value: `${event.ticketsSold} / ${event.capacity}`,
      icon: Ticket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Revenue",
      value: `$${event.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Check-in Rate",
      value: `${event.checkInRate}%`,
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/events" className="gt-icon-btn">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold">{event.title}</h1>
            <span
              className={`gt-badge ${
                event.status === "published"
                  ? "gt-badge-success"
                  : "gt-badge-muted"
              }`}
            >
              {event.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {event.date} • {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="gt-icon-btn">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="gt-btn-primary">
            <Edit className="h-4 w-4 mr-2" />
            Edit Event
          </button>
        </div>
      </div>

      {/* Event Banner */}
      <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-white/80 text-sm">Event Progress</p>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{
                    width: `${(event.ticketsSold / event.capacity) * 100}%`,
                  }}
                />
              </div>
              <span className="text-white font-semibold">
                {Math.round((event.ticketsSold / event.capacity) * 100)}%
              </span>
            </div>
          </div>
          <button className="gt-btn-ghost text-white border border-white/30 hover:bg-white/10">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="gt-card-flat p-5">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Types */}
        <div className="lg:col-span-2 gt-card-flat">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold">Ticket Types</h2>
            <p className="text-sm text-muted-foreground">
              Sales by ticket category
            </p>
          </div>
          <div className="p-5 space-y-4">
            {event.ticketTypes.map((ticket, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${ticket.color}`}
                    />
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${ticket.price} per ticket
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{ticket.sold} sold</p>
                    <p className="text-sm text-muted-foreground">
                      {ticket.available} available
                    </p>
                  </div>
                </div>
                <div className="gt-progress">
                  <div
                    className="gt-progress-bar"
                    style={{
                      width: `${
                        (ticket.sold / (ticket.sold + ticket.available || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="gt-card-flat">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold">Event Details</h2>
          </div>
          <div className="p-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {event.description}
            </p>

            <div className="mt-6 pt-6 border-t border-dashed border-border space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Quick Actions
                </p>
              </div>
              <button className="gt-btn-outline w-full text-sm py-2.5">
                View Attendees
              </button>
              <button className="gt-btn-outline w-full text-sm py-2.5">
                Manage Check-in
              </button>
              <button className="gt-btn-ghost w-full text-sm py-2.5 text-destructive hover:bg-destructive/10">
                Cancel Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
