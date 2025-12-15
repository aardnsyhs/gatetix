import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Calendar,
  MapPin,
  MoreVertical,
  Users,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM",
    location: "Central Park, NY",
    status: "published",
    ticketsSold: 450,
    capacity: 1000,
    revenue: "$22,050",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    date: "August 20, 2024",
    time: "9:00 AM",
    location: "Convention Center, SF",
    status: "draft",
    ticketsSold: 0,
    capacity: 500,
    revenue: "$0",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "September 5, 2024",
    time: "12:00 PM",
    location: "Downtown, LA",
    status: "published",
    ticketsSold: 280,
    capacity: 400,
    revenue: "$9,800",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop",
  },
];

export default function AdminEvents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your events and ticket sales
          </p>
        </div>
        <button className="gt-btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="gt-input-search flex-1 max-w-md"
        />
        <div className="gt-tabs">
          <button className="gt-tab active">All</button>
          <button className="gt-tab">Published</button>
          <button className="gt-tab">Draft</button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="gt-card overflow-hidden group">
            {/* Event Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3">
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
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-lg line-clamp-1">
                  {event.title}
                </h3>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-5">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between py-3 border-t border-dashed border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-semibold">{event.ticketsSold}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      / {event.capacity}
                    </span>
                  </span>
                </div>
                <span className="font-semibold text-primary">
                  {event.revenue}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="gt-progress mt-2">
                <div
                  className="gt-progress-bar"
                  style={{
                    width: `${(event.ticketsSold / event.capacity) * 100}%`,
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <Link to={`/admin/events/${event.id}`} className="flex-1">
                  <button className="gt-btn-primary w-full text-sm py-2">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </Link>
                <div className="relative">
                  <button
                    className="gt-icon-btn"
                    onClick={() =>
                      setActiveMenu(activeMenu === event.id ? null : event.id)
                    }
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {activeMenu === event.id && (
                    <div className="gt-dropdown absolute right-0 bottom-full mb-2 w-40 py-1 animate-scale-in z-10">
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted transition-smooth">
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
